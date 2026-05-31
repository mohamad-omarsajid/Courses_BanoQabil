/* Single-open sidebar accordion: opening one top-level chapter closes the rest.
   Uses event delegation on document so it survives Material's instant navigation. */
(function () {
  var SEL = ".md-nav--primary > .md-nav__list > .md-nav__item > .md-nav__toggle";

  document.addEventListener("change", function (e) {
    var t = e.target;
    if (!t.matches || !t.matches(SEL)) return;
    if (!t.checked) return;
    document.querySelectorAll(SEL).forEach(function (other) {
      if (other !== t) other.checked = false;
    });
  });
})();
