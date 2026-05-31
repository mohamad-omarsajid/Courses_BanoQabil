/* Floating "On this page" button + popover (replaces the right TOC sidebar).
   Models the toc-fab/toc-pop from NEW_DESIGN_DIRECTION.html:
   - a pill at the bottom-right showing the heading count
   - clicking it opens a popover listing this page's headings
   - the popover closes on outside click and hides near the footer
   - the active heading is mirrored from Material's own scrollspy
   Runs on every page via document$ (survives instant navigation). */
(function () {
  "use strict";

  var fab, pop, footerObserver, scrollBound;

  function buildFromToc() {
    // Material renders the page TOC in the (now hidden) secondary sidebar.
    var src = document.querySelector(".md-sidebar--secondary .md-nav--secondary");
    var links = src ? src.querySelectorAll("a.md-nav__link") : [];
    return links;
  }

  function ensureShell() {
    if (!fab) {
      fab = document.createElement("button");
      fab.id = "bq-toc-fab";
      fab.className = "bq-toc-fab";
      fab.type = "button";
      fab.setAttribute("aria-label", "On this page");
      fab.innerHTML =
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
        '<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>' +
        '<line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' +
        '<span class="bq-toc-fab__label">On this page</span>' +
        '<span class="bq-toc-fab__count"></span>';
      document.body.appendChild(fab);

      pop = document.createElement("div");
      pop.id = "bq-toc-pop";
      pop.className = "bq-toc-pop";
      pop.innerHTML = '<div class="bq-toc-pop__lbl">On this page</div><div class="bq-toc-pop__list"></div>';
      document.body.appendChild(pop);

      fab.addEventListener("click", function (e) {
        e.stopPropagation();
        pop.classList.toggle("open");
      });
      document.addEventListener("click", function (e) {
        if (!pop.contains(e.target) && !fab.contains(e.target)) pop.classList.remove("open");
      });
    }
  }

  function fill() {
    var links = buildFromToc();
    var list = pop.querySelector(".bq-toc-pop__list");
    list.innerHTML = "";
    if (!links.length) {
      fab.style.display = "none";
      return;
    }
    fab.style.display = "";
    fab.querySelector(".bq-toc-fab__count").textContent = links.length;
    links.forEach(function (a) {
      var item = document.createElement("a");
      item.href = a.getAttribute("href");
      item.textContent = a.textContent.trim();
      item.dataset.href = a.getAttribute("href");
      item.addEventListener("click", function () { pop.classList.remove("open"); });
      list.appendChild(item);
    });
    syncActive();
  }

  function syncActive() {
    var active = document.querySelector(".md-sidebar--secondary .md-nav__link--active");
    var href = active ? active.getAttribute("href") : null;
    pop.querySelectorAll("a").forEach(function (a) {
      a.classList.toggle("active", href && a.dataset.href === href);
    });
  }

  function watchFooter() {
    if (footerObserver) footerObserver.disconnect();
    var foot = document.querySelector(".md-footer__inner") || document.querySelector(".md-footer-meta") || document.querySelector(".md-footer");
    if (!foot || !("IntersectionObserver" in window)) return;
    footerObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          fab.classList.add("bq-hidden");
          pop.classList.remove("open");
        } else {
          fab.classList.remove("bq-hidden");
        }
      });
    }, { rootMargin: "0px 0px -120px 0px" });
    footerObserver.observe(foot);
  }

  function run() {
    ensureShell();
    fill();
    pop.classList.remove("open");
    watchFooter();
    if (!scrollBound) {
      scrollBound = true;
      var ticking = false;
      window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { syncActive(); ticking = false; });
      }, { passive: true });
    }
  }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
