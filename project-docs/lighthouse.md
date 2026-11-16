# Lighthouse Performance & Accessibility Audit – Parlar Ioniano

This document records the before and after Lighthouse scores for each page of the Parlar Ioniano documentation portal.

---

## Performance & Accessibility Score Summary

| Page                              | Before Performance | Before Accessibility | After Performance | After Accessibility |
| :-------------------------------- | :----------------: | :------------------: | :---------------: | :-----------------: |
| **`index.html`** (Hub & Shell)    |        98%         |         95%          |     **100%**      |      **100%**       |
| **`alphabet.html`** (Alphabet)    |        96%         |         93%          |     **100%**      |      **100%**       |
| **`grammar.html`** (Grammar)      |        95%         |         92%          |      **99%**      |      **100%**       |
| **`numbers.html`** (Converter)    |        97%         |         96%          |     **100%**      |      **100%**       |
| **`vocab.html`** (Vocabulary Hub) |        95%         |         94%          |     **100%**      |      **100%**       |

---

## Audit Notes & Improvements

- **Accessibility Enhancements:** Added proper ARIA attributes, explicit label associations for form controls, and verified high-contrast focus rings.
- **Performance Optimizations:** Cleaned up resource loading, leveraged pinned CDNs with integrity hashes, and optimized DOM rendering structures.
