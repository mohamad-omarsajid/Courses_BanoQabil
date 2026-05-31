/* Roman Urdu toggle.
   Lessons are written in English with short Roman Urdu helpers in brackets,
   like: file (Roman Urdu: ek cheez jo computer par save hoti hai).
   Seeing both at once is noisy, so this adds a header toggle that shows or
   hides those inline Roman Urdu glosses. The choice is saved per reader.

   Only the inline glosses (real text in the lesson body) are wrapped. The
   Roman Urdu inside glossary tooltips lives in a title="" attribute, not in
   the text, so it is left alone and still shows on hover.

   Runs on every page, including Material's instant navigation, via document$. */
(function () {
  "use strict";

  var KEY = "bq-roman-urdu";          // "off" = hide glosses; unset or "on" = show
  var GLOSS = /\s?\(Roman Urdu:[^)]*\)/g;

  function showRoman() {
    // Roman Urdu help shows by default; a reader can turn it off and that sticks.
    return localStorage.getItem(KEY) !== "off";
  }

  function apply() {
    var on = showRoman();
    document.body.classList.toggle("bq-show-roman", on);
    // update every toggle (header + the mobile one injected into the drawer)
    document.querySelectorAll(".bq-roman-toggle").forEach(function (btn) {
      btn.classList.toggle("is-on", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      var state = btn.querySelector(".bq-roman-state");
      if (state) state.textContent = on ? "On" : "Off";
    });
  }

  // one delegated click handler covers every current and future toggle
  function bindClicks() {
    if (window.__bqRomanBound) return;
    window.__bqRomanBound = true;
    document.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest(".bq-roman-toggle")) {
        localStorage.setItem(KEY, showRoman() ? "off" : "on");
        apply();
      }
    });
  }

  function wrapGlosses(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        GLOSS.lastIndex = 0;
        if (!GLOSS.test(node.nodeValue)) return NodeFilter.FILTER_SKIP;
        var p = node.parentNode;
        while (p && p !== root) {
          var tag = p.nodeName;
          if (tag === "CODE" || tag === "PRE" || tag === "SCRIPT" || tag === "STYLE") {
            return NodeFilter.FILTER_REJECT;
          }
          if (p.classList && p.classList.contains("ru-gloss")) {
            return NodeFilter.FILTER_REJECT;
          }
          p = p.parentNode;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var targets = [];
    var n;
    while ((n = walker.nextNode())) targets.push(n);

    targets.forEach(function (textNode) {
      var text = textNode.nodeValue;
      var frag = document.createDocumentFragment();
      var last = 0;
      var m;
      GLOSS.lastIndex = 0;
      while ((m = GLOSS.exec(text))) {
        if (m.index > last) {
          frag.appendChild(document.createTextNode(text.slice(last, m.index)));
        }
        var span = document.createElement("span");
        span.className = "ru-gloss";
        span.textContent = m[0];
        frag.appendChild(span);
        last = m.index + m[0].length;
      }
      if (last < text.length) {
        frag.appendChild(document.createTextNode(text.slice(last)));
      }
      textNode.parentNode.replaceChild(frag, textNode);
    });
  }

  function injectButton() {
    if (document.getElementById("bq-roman-toggle")) return;
    var header = document.querySelector(".md-header__inner");
    if (!header) return;

    var btn = document.createElement("button");
    btn.id = "bq-roman-toggle";
    btn.type = "button";
    btn.className = "bq-roman-toggle";
    btn.title = "Show or hide the Roman Urdu help shown next to English terms";
    btn.setAttribute("aria-label", "Toggle Roman Urdu help");
    // a sliding switch (label + track + knob), matching the design direction
    btn.innerHTML =
      '<span class="bq-roman-label">Roman Urdu</span>' +
      '<span class="bq-roman-track" aria-hidden="true"></span>' +
      '<span class="bq-roman-state" hidden>On</span>';
    // clicks are handled by the delegated listener in bindClicks()

    // sit just before the theme toggle (Material's palette option)
    var palette = header.querySelector(".md-header__option");
    if (palette) {
      header.insertBefore(btn, palette);
    } else {
      header.appendChild(btn);
    }
  }

  function run() {
    bindClicks();
    injectButton();
    wrapGlosses(document.querySelector(".md-content"));
    apply();
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
