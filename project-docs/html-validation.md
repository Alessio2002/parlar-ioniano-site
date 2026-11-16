# HTML Validation Report – Parlar Ioniano

This document records the W3C HTML validation findings and applied fixes for each page of the Parlar Ioniano documentation portal prior to final deployment.

---

## 1. index.html (Main Shell)

- **W3C Validator Status:** Valid HTML5 (0 Errors, 0 Warnings)
- **Findings:** Proper nesting of structural landmark elements and iframe attributes. No duplicate IDs found.

## 2. alphabet.html (Alphabet & Pronunciation)

- **W3C Validator Status:** Valid HTML5 (0 Errors, 0 Warnings)
- **Findings:** Minor warning on missing explicit aria-controls linkage for collapsible elements.
- **Fix Applied:** Added explicit `aria-expanded="false"` and matching IDs to the IPA legend card header.

## 3. grammar.html (Pronouns & Grammar)

- **W3C Validator Status:** Valid HTML5 (0 Errors, 0 Warnings)
- **Findings:** Potential duplicate heading IDs in dynamically generated accordion items.
- **Fix Applied:** Ensured unique item IDs (`heading-${set.id}` and `collapse-${set.id}`) across all generated accordion sections.

## 4. numbers.html (Numbers Converter)

- **W3C Validator Status:** Valid HTML5 (0 Errors, 0 Warnings)
- **Findings:** All form inputs properly linked via `for` attributes to corresponding label elements.

## 5. vocab.html (Vocabulary & Phrasebook Hub)

- **W3C Validator Status:** Valid HTML5 (0 Errors, 0 Warnings)
- **Findings:** Warning regarding missing explicit container labelling for radio button groups (`phraseLang`).
- **Fix Applied:** Ensured proper ARIA labelling and fieldset structure around the filter and radio options.
