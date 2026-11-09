# Test Matrix – Parlar Ioniano

| Test ID   | Category       | Description / Input                                                | Expected Result                                                                           | Actual Result / Status |
| :-------- | :------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------- | :--------------------- |
| **TC-01** | Normal Use     | Load Alphabet & Pronunciation view                                 | Renders all phonetic tables and IPA guide correctly                                       | Passed                 |
| **TC-02** | Normal Use     | Load Pronouns & Grammar accordions                                 | Expands/collapses grammatical matrices smoothly                                           | Passed                 |
| **TC-03** | Normal Use     | Type integer `1000` into Numbers Converter                         | Outputs Standard Ionian cardinal form `mille`                                             | Passed                 |
| **TC-04** | Normal Use     | Type `58` into Numbers Converter                                   | Outputs `cinquantoto` with correct vowel clipping                                         | Passed                 |
| **TC-05** | Normal Use     | Type `thank` into Vocabulary Search                                | Filters cards, returns "Benfacì" card, and announces match count via `aria-live`          | Passed                 |
| **TC-06** | Limits         | Test number converter at upper bound `999,999,999,999,999,999,999` | Successfully converts full quintillion compound string                                    | Passed                 |
| **TC-07** | Limits         | Test dialogue viewer language toggle                               | Instantly switches dialogue turns between Ionian-only, English-only, and Both             | Passed                 |
| **TC-08** | Error Case     | Enter non-numeric text (`abc`) into Numbers Converter              | Displays clear validation error message without breaking UI                               | Passed                 |
| **TC-09** | Error Case     | Enter out-of-range number exceeding quintillion limit              | Displays range limit error message                                                        | Passed                 |
| **TC-10** | Error/Security | Broken-network fetch simulation (renaming `words.json`)            | Catches fetch error gracefully and presents loading/error state                           | Passed                 |
| **TC-11** | Error/Security | Input garbage/junk characters into vocabulary search               | Returns 0 matches, updates live count to `Found 0 matching word(s)` cleanly               | Passed                 |
| **TC-12** | XSS Attack     | Type XSS payload `<img src=x onerror=alert(1)>` into search input  | Renders string strictly as plain text via `textContent`; no script execution or alert box | Passed                 |
