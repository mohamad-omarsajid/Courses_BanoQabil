/* Collapsible left sidebar (desktop).
   - A toggle icon at the top of the sidebar collapses it to a thin rail.
   - When collapsed, clicking anywhere on the rail opens it again.
   The choice is saved per reader. Runs on every page via document$. */
(function () {
  "use strict";

  var KEY = "bq-sidebar"; // "closed" = collapsed

  function isClosed() { return localStorage.getItem(KEY) === "closed"; }
  function apply() { document.documentElement.classList.toggle("bq-sidebar-collapsed", isClosed()); }
  function setClosed(v) { localStorage.setItem(KEY, v ? "closed" : "open"); apply(); }

  var ICON =
    '<svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">' +
    '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
    '<line x1="9.5" y1="4.5" x2="9.5" y2="19.5" stroke="currentColor" stroke-width="1.6"/>' +
    '<path class="bq-sb-chev" d="M16 9.5 L13 12 L16 14.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  function inject() {
    var prim = document.querySelector(".md-sidebar--primary");
    if (!prim) return;

    if (!document.getElementById("bq-sidebar-toggle")) {
      var btn = document.createElement("button");
      btn.id = "bq-sidebar-toggle";
      btn.className = "bq-sidebar-toggle";
      btn.type = "button";
      btn.title = "Collapse or expand the sidebar";
      btn.setAttribute("aria-label", "Toggle sidebar");
      btn.innerHTML = ICON;
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        setClosed(!isClosed());
      });
      prim.insertBefore(btn, prim.firstChild);
    }

    if (!prim.dataset.bqRailBound) {
      prim.dataset.bqRailBound = "1";
      // clicking the collapsed rail (but not the button itself) re-opens it
      prim.addEventListener("click", function () {
        if (isClosed()) setClosed(false);
      });
    }
  }

  function run() { inject(); apply(); }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
