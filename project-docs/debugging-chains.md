# Debugging Chains – Parlar Ioniano

This document records the structured debugging chains for key issues identified and resolved during the development of the Parlar Ioniano documentation portal. Every chain concludes with a verified regression test in `project-docs/test-matrix.md`.

---

## Chain 1/3: Vocabulary Search XSS Vulnerability & Plain-Text Rendering

- **Observation:** Typing HTML/JavaScript markup (e.g., `<img src=x onerror=alert(1)>`) into the vocabulary filter input risked executing arbitrary scripts if rendered via `innerHTML` or unescaped template literals.
- **Reproduction:** Navigate to `vocab.html` (`Basic Vocabulary` tab), enter `<img src=x onerror=alert(1)>` into `#wordSearch`, and observe how the DOM renders the filter output or card elements.
- **Cause:** Using `innerHTML` for dynamic user-supplied strings allows the browser's HTML parser to interpret injected tags and inline event handlers.
  - **Source:** [MDN Web Docs – Element.innerHTML (Security considerations)](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML#security_considerations) & [MDN Web Docs – Node.textContent](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
- **Fix Commit:** Replaced `innerHTML` string interpolation in `renderWords()` (`vocab.html`) with explicit DOM node creation (`document.createElement`) and safe `.textContent` assignments for `w.ionian`, `w.english`, `w.ipa`, and `w.notes`.
- **Re-Test:** Re-entered `<img src=x onerror=alert(1)>` on the deployed public URL (`https://alessio2002.github.io/parlar-ioniano-site/`); confirmed zero script execution and clean plain-text handling.
- **Regression Test:** Logged and verified as **TC-12** in [`project-docs/test-matrix.md`](./test-matrix.md#tc-12).

---

## Chain 2/3: Broken Iframe Double-Header Layout on Subpages

- **Observation:** When navigating between pages (`alphabet.html`, `grammar.html`, `numbers.html`) inside the main `index.html` `<iframe>` shell, two navigation bars and two "Help / What is this?" buttons appeared stacked on top of each other.
- **Reproduction:** Open `index.html` on the public deployment and select any destination from the `Navigation Menu` dropdown targeting `content-frame`.
- **Cause:** Each standalone HTML page included its own `<header id="page-header">` so it could function independently when opened directly, without checking whether it was embedded inside a parent browsing context (`window.self !== window.top`).
  - **Source:** [MDN Web Docs – Window.top](https://developer.mozilla.org/en-US/docs/Web/API/Window/top) & [Bootstrap 5 Navbar Documentation](https://getbootstrap.com/docs/5.3/components/navbar/)
- **Fix Commit:** Added an inline initialization script before the closing `</body>` tag in `alphabet.html`, `grammar.html`, and `numbers.html` that checks `if (window.self !== window.top)` and sets `header.style.display = "none"`.
- **Re-Test:** Reloaded `index.html` and cycled through all navigation dropdown links; confirmed only the outer shell navbar renders inside the iframe while direct page visits still display their standalone header.
- **Regression Test:** Verified under **TC-01** and **TC-02** in [`project-docs/test-matrix.md`](./test-matrix.md#tc-01).

---

## Chain 3/3: Missing Initial Prompt in Numbers Converter on Page Load

- **Observation:** Upon first opening `numbers.html` (or selecting "Numbers Converter" from the navigation menu), the `#converterResult` output box rendered completely empty instead of displaying `"Please enter a number."`[cite: 1]. Typing a digit and then deleting it caused the prompt to appear properly.
- **Reproduction:**
  1. Open `https://alessio2002.github.io/parlar-ioniano-site/` and navigate to **Numbers Converter** (`numbers.html`).
  2. Observe the `#converterResult` box immediately after page load before interacting with `#numberInput`.
- **Cause:** `updateConversion()` was bound only to the `input` event on `#numberInput` and `change` events on `#typeSelect` and `#genderSelect`, but was never invoked once during module initialization when the DOM finished loading[cite: 1].
  - **Source:** [MDN Web Docs – EventTarget.addEventListener()](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) & [MDN Web Docs – JavaScript Modules (Deferred execution)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#other_differences_between_modules_and_standard_scripts)
- **Fix Commit:** Added an initial `updateConversion();` call immediately after registering the event listeners in `numbers.html` (implemented in `numbers_2.html` / `numbers.html`).
- **Re-Test:** Deployed the updated `numbers.html` and performed a hard refresh on the public URL; confirmed `"Please enter a number."` renders immediately inside `#converterResult` upon initial load[cite: 8].
- **Regression Test:** Added as **TC-13** in [`project-docs/test-matrix.md`](./test-matrix.md#tc-13).

| **TC-13** | Regression (Chain 3/3) | Open `numbers.html` fresh without typing into `#numberInput` | Immediately displays `"Please enter a number."` inside `#converterResult` upon page load[cite: 8] | **Passed** (Observed: 16/11/2026) |
