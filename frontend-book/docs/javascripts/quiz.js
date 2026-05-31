/* Bano Qabil interactive exercises: a small Duolingo-style practice layer.

   Authoring (in any lesson):

     ```quiz
     MCQ: Which property controls spacing along the **main axis**?
     ( ) `align-items`
     (x) `justify-content`
     ( ) `flex-wrap`
     Why: The main axis is controlled by `justify-content`.

     FILL: To center on the cross axis, complete `align-items: ___;`
     Answer: center
     Why: `align-items` positions items along the cross axis.
     ```

   Rules:
   - Start each question with `MCQ:` or `FILL:`.
   - MCQ options are lines like `( ) wrong` and `(x) correct` (mark the right one with x).
   - FILL uses `___` in the prompt for the blank and `Answer:` for the expected text
     (use `a | b` to allow more than one acceptable answer).
   - `Why:` is an optional one-line explanation shown after answering.

   Progress (XP, streak, which questions are done) is saved in localStorage. No
   backend yet; when accounts ship, this same state can sync to a profile.

   Runs on every page, including Material's instant navigation, via document$. */
(function () {
  "use strict";

  var XP_PER = 10;
  var SLOT = "%%BQFILL%%"; // placeholder for the blank inside a FILL prompt

  function lsGet(k, d) {
    try { var v = JSON.parse(localStorage.getItem(k)); return v === null ? d : v; }
    catch (e) { return d; }
  }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  function getXP() { return lsGet("bq-xp", 0); }
  function addXP(n) { var t = getXP() + n; lsSet("bq-xp", t); return t; }
  function doneSet() { return new Set(lsGet("bq-done", [])); }
  function isDone(id) { return doneSet().has(id); }
  function markDone(id) { var s = doneSet(); s.add(id); lsSet("bq-done", Array.from(s)); }

  function dayString(offsetDays) {
    return new Date(Date.now() - (offsetDays || 0) * 86400000).toISOString().slice(0, 10);
  }
  function bumpStreak() {
    var today = dayString(0);
    var s = lsGet("bq-streak", { count: 0, last: null });
    if (s.last === today) return;
    s.count = (s.last === dayString(1)) ? s.count + 1 : 1;
    s.last = today;
    lsSet("bq-streak", s);
  }
  function streakCount() {
    var s = lsGet("bq-streak", { count: 0, last: null });
    if (s.last === dayString(0) || s.last === dayString(1)) return s.count;
    return 0;
  }

  function el(tag, cls) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  /* minimal inline rendering: escape HTML, then `code` and **bold** */
  function inline(text) {
    var s = String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return s;
  }

  function parse(raw) {
    var lines = String(raw).split("\n");
    var items = [];
    var cur = null;
    for (var i = 0; i < lines.length; i++) {
      var t = lines[i].trim();
      if (!t) continue;
      var m;
      if ((m = t.match(/^MCQ:\s*(.*)$/i))) {
        cur = { type: "mcq", q: m[1], options: [], correct: -1, why: "" };
        items.push(cur);
      } else if ((m = t.match(/^FILL:\s*(.*)$/i))) {
        cur = { type: "fill", q: m[1], answers: [], why: "" };
        items.push(cur);
      } else if (cur && cur.type === "mcq" && (m = t.match(/^\(([ xX])\)\s*(.*)$/))) {
        if (m[1].toLowerCase() === "x") cur.correct = cur.options.length;
        cur.options.push(m[2]);
      } else if (cur && cur.type === "fill" && (m = t.match(/^Answer:\s*(.*)$/i))) {
        cur.answers = m[1].split("|").map(function (a) { return a.trim().toLowerCase(); });
      } else if (cur && (m = t.match(/^Why:\s*(.*)$/i))) {
        cur.why = m[1];
      } else if (cur) {
        cur.q += " " + t; // continuation of a long prompt
      }
    }
    return items;
  }

  /* award XP once per question; returns true only the first time it is solved */
  function award(id, correct) {
    if (correct && !isDone(id)) {
      markDone(id);
      addXP(XP_PER);
      bumpStreak();
      return true;
    }
    return false;
  }

  function refreshStats(node) {
    node.innerHTML =
      '<span class="bq-stat">🔥 ' + streakCount() + " day streak</span>" +
      '<span class="bq-stat">⭐ ' + getXP() + " XP</span>";
  }
  function refreshAllStats() {
    document.querySelectorAll(".bq-exercise__stats").forEach(refreshStats);
  }

  function showWhy(wrap, item, correct, awarded, answer) {
    var why = el("div", "bq-q__why " + (correct ? "is-correct" : "is-wrong"));
    var head = correct ? "Correct" : "Not quite";
    if (correct && awarded) head += " (+" + XP_PER + " XP)";
    var body = item.why ? inline(item.why) : "";
    if (!correct && answer) {
      body = (body ? body + " " : "") + "The answer is <code>" +
        answer.replace(/</g, "&lt;") + "</code>.";
    }
    why.innerHTML = '<span class="bq-q__verdict">' + head + "</span>" +
      (body ? '<span class="bq-q__explain">' + body + "</span>" : "");
    wrap.appendChild(why);
  }

  function renderMCQ(item, id, onAnswered) {
    var wrap = el("div", "bq-q");
    var prompt = el("p", "bq-q__prompt");
    prompt.innerHTML = inline(item.q);
    wrap.appendChild(prompt);
    var opts = el("div", "bq-q__options");
    item.options.forEach(function (opt, i) {
      var b = el("button", "bq-opt");
      b.type = "button";
      b.innerHTML = inline(opt);
      b.addEventListener("click", function () {
        if (wrap.classList.contains("is-answered")) return;
        wrap.classList.add("is-answered");
        var correct = i === item.correct;
        b.classList.add(correct ? "is-correct" : "is-wrong");
        if (!correct && opts.children[item.correct]) {
          opts.children[item.correct].classList.add("is-correct");
        }
        var awarded = award(id, correct);
        showWhy(wrap, item, correct, awarded, null);
        refreshAllStats();
        onAnswered(correct);
      });
      opts.appendChild(b);
    });
    wrap.appendChild(opts);
    return wrap;
  }

  function renderFill(item, id, onAnswered) {
    var wrap = el("div", "bq-q");
    var prompt = el("p", "bq-q__prompt");
    // Put a placeholder where the blank goes, render inline markup on the whole
    // prompt (so `display: ___;` stays one code span), then swap in the input.
    var q = item.q.indexOf("___") !== -1 ? item.q.replace("___", SLOT) : item.q + " " + SLOT;
    prompt.innerHTML = inline(q).replace(SLOT,
      '<input type="text" class="bq-fill" autocomplete="off" spellcheck="false">');
    var btn = el("button", "bq-check");
    btn.type = "button";
    btn.textContent = "Check";
    prompt.appendChild(btn);
    wrap.appendChild(prompt);
    var input = prompt.querySelector(".bq-fill");

    function check() {
      if (wrap.classList.contains("is-answered")) return;
      var val = (input.value || "").trim().toLowerCase();
      if (!val) return;
      wrap.classList.add("is-answered");
      input.disabled = true;
      btn.disabled = true;
      var correct = item.answers.indexOf(val) !== -1;
      input.classList.add(correct ? "is-correct" : "is-wrong");
      var awarded = award(id, correct);
      showWhy(wrap, item, correct, awarded, correct ? null : item.answers[0]);
      refreshAllStats();
      onAnswered(correct);
    }
    btn.addEventListener("click", check);
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); check(); }
    });
    return wrap;
  }

  function build(src) {
    if (src.dataset.bqReady) return;
    src.dataset.bqReady = "1";
    var items = parse(src.textContent);
    if (!items.length) { src.style.display = "none"; return; }

    var ex = el("div", "bq-exercise");
    var head = el("div", "bq-exercise__head");
    head.innerHTML = '<span class="bq-exercise__title">Practice</span>';
    var stats = el("div", "bq-exercise__stats");
    refreshStats(stats);
    head.appendChild(stats);
    ex.appendChild(head);

    var result = el("div", "bq-exercise__result");
    var answered = 0, correctCount = 0;
    function onAnswered(correct) {
      answered += 1;
      if (correct) correctCount += 1;
      if (answered === items.length) {
        result.classList.add("is-shown");
        result.textContent = "You got " + correctCount + " out of " + items.length + " right.";
      }
    }

    var path = location.pathname;
    items.forEach(function (item, idx) {
      var id = path + "#q" + idx;
      ex.appendChild(item.type === "mcq"
        ? renderMCQ(item, id, onAnswered)
        : renderFill(item, id, onAnswered));
    });
    ex.appendChild(result);
    src.replaceWith(ex);
  }

  function run() {
    document.querySelectorAll(".bq-quiz-src").forEach(build);
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
