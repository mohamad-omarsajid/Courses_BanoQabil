/* Glossary tooltips.
   Markdown abbreviations render as <abbr title="...">term</abbr>, and the
   browser's native title tooltip looks poor and cannot be tapped. This script:
     1. moves each title into a data-tip attribute (so the native tooltip is gone
        and our CSS bubble shows on hover), and
     2. lets the reader CLICK an underlined term to pin its tooltip open, and
        click anywhere else (or press Escape) to close it.
   Styling lives in stylesheets/brand.css. Runs on every page via document$. */
(function () {
  "use strict";

  function setup(root) {
    if (!root) return;
    root.querySelectorAll("abbr[title]").forEach(function (el) {
      el.setAttribute("data-tip", el.getAttribute("title"));
      el.removeAttribute("title");
    });
  }

  function closeAll(except) {
    document.querySelectorAll("abbr.bq-tip-open").forEach(function (el) {
      if (el !== except) el.classList.remove("bq-tip-open");
    });
  }

  // Decide whether the bubble should sit above (default) or below the term.
  // If the term is near the top of the screen, there is no room above, so flip it.
  function position(el) {
    var r = el.getBoundingClientRect();
    el.classList.toggle("bq-tip-below", r.top < 150);
  }

  // Bind the click and key handlers once for the whole document.
  if (!window.__bqTipBound) {
    window.__bqTipBound = true;

    document.addEventListener("click", function (e) {
      var ab = e.target.closest ? e.target.closest("abbr[data-tip]") : null;
      if (ab) {
        var isOpen = ab.classList.contains("bq-tip-open");
        closeAll(ab);
        position(ab);
        ab.classList.toggle("bq-tip-open", !isOpen);
        e.stopPropagation();
      } else {
        closeAll(null);
      }
    });

    // also set the side on hover, so the bubble flips for mouse users too
    document.addEventListener("mouseover", function (e) {
      var ab = e.target.closest ? e.target.closest("abbr[data-tip]") : null;
      if (ab) position(ab);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAll(null);
    });
  }

  function run() {
    setup(document.querySelector(".md-content"));
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
