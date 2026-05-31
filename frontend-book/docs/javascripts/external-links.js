/* Open external links in a new tab; keep internal links in the same page.
   An external link is one whose host differs from the current site's host.
   Runs on every page, including Material's instant navigation, via document$. */
(function () {
  "use strict";

  function run() {
    var host = location.hostname;
    var links = document.querySelectorAll(".md-content a[href], .md-typeset a[href]");
    links.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (!/^https?:\/\//i.test(href)) return; // in-page, relative, mailto: stay as-is
      try {
        var u = new URL(href, location.href);
        if (u.hostname && u.hostname !== host) {
          a.target = "_blank";
          a.rel = "noopener noreferrer";
        }
      } catch (e) {}
    });
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
