/* Mobile: move the header toggles into the sidebar drawer.
   On small screens the header gets crowded, so the Roman Urdu switch and the
   theme toggle are hidden there (via CSS) and mirrored here at the top of the
   drawer instead. Re-injected on every navigation because Material's instant
   navigation rebuilds the sidebar. The Roman Urdu button reuses the shared
   .bq-roman-toggle behaviour (state + clicks handled by language-toggle.js). */
(function () {
  "use strict";

  function currentScheme() {
    return document.body.getAttribute("data-md-color-scheme") || "slate";
  }

  function flipTheme() {
    // drive Material's own palette toggle by clicking the label of the next
    // scheme; this persists the choice the way the header toggle would
    var inputs = [].slice.call(document.querySelectorAll('input[name="__palette"]'));
    if (!inputs.length) return;
    var idx = -1;
    inputs.forEach(function (i, k) { if (i.checked) idx = k; });
    var nextIdx = (idx + 1) % inputs.length;
    // click the radio itself (the label is display:none on mobile, so a label
    // click would not forward); a real click fires the change Material listens for
    inputs[nextIdx].click();
  }

  function paintTheme(btn) {
    var dark = currentScheme() === "slate";
    btn.querySelector(".bq-mobile-theme__label").textContent = dark ? "Light mode" : "Dark mode";
    btn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }

  function inject() {
    // pin to the drawer panel itself (not the nav), so the controls stay
    // visible even inside Material's nested mobile sub-panes
    var drawer = document.querySelector(".md-sidebar--primary");
    if (!drawer || drawer.querySelector(":scope > .bq-mobile-controls")) return;

    var wrap = document.createElement("div");
    wrap.className = "bq-mobile-controls";

    // Roman Urdu switch (shared behaviour via .bq-roman-toggle)
    var ru = document.createElement("button");
    ru.type = "button";
    ru.className = "bq-roman-toggle bq-roman-toggle--mobile";
    ru.setAttribute("aria-label", "Toggle Roman Urdu help");
    ru.innerHTML =
      '<span class="bq-roman-label">Roman Urdu</span>' +
      '<span class="bq-roman-track" aria-hidden="true"></span>' +
      '<span class="bq-roman-state" hidden>On</span>';

    // theme toggle (flips Material's palette)
    var theme = document.createElement("button");
    theme.type = "button";
    theme.className = "bq-mobile-theme";
    theme.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>' +
      '<span class="bq-mobile-theme__label">Dark mode</span>';
    theme.addEventListener("click", function () {
      flipTheme();
      // scheme attribute updates synchronously after the change handler
      setTimeout(function () { paintTheme(theme); }, 0);
    });

    wrap.appendChild(ru);
    wrap.appendChild(theme);
    drawer.appendChild(wrap);

    // paint the Roman Urdu switch's initial state (language-toggle's apply()
    // pass runs before this button exists, so set it from the body flag here)
    var ruOn = document.body.classList.contains("bq-show-roman");
    ru.classList.toggle("is-on", ruOn);
    ru.setAttribute("aria-pressed", ruOn ? "true" : "false");
    var ruState = ru.querySelector(".bq-roman-state");
    if (ruState) ruState.textContent = ruOn ? "On" : "Off";

    paintTheme(theme);
  }

  function run() { inject(); }

  if (window.document$ && typeof window.document$.subscribe === "function") {
    window.document$.subscribe(run);
  } else {
    document.addEventListener("DOMContentLoaded", run);
  }
})();
