# User Acceptance Test – Week 48

- **Date:** 2026-11-17
- **Tester Role:** Tester B (Supervisor-Approved)
- **Assigned Written Tasks (No Hints):**
  1. _"Starting from the home page, use the site to find the Chapter 1 conversational dialogues, read how to order in a café, and check the English translation for the phrases."_
  2. _"Starting from the home page, navigate to the numbers section and convert the number 42 into Ionian."_

---

## Observation Log & Verbatim Feedback

| Tester's Verbatim Words (Original Finnish)                                                                                                                                   | Analytical Interpretation & Hesitation Point                                                                                                                                                                                                             | Corrective Action & Interface Fix                                                                                                                                                                        |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _"En löytänyt kahvila-kohtausta ilman apua (navigaatiossa huonoa)."_<br>_(Translation: "I couldn't find the café scene without help (bad navigation).")_                     | **Critical Hesitation (Task 1):** Tester struggled to locate the café dialogue because it is nested inside the Vocabulary page behind a secondary tab (_Chapter 1 Dialogues_), rather than being immediately visible from the top-level navigation menu. | Updated navigation menu labeling in `index.html` to explicitly include **"Dialogues"** alongside Vocabulary, and added a clear visual cue on `vocab.html` pointing users to the Chapter 1 Dialogues tab. |
| _"Löysin numero-osuuden vaivattomasti (navigaatiossa hyvää!)"_<br>_(Translation: "I found the numbers section effortlessly (good navigation!)")_                             | **Success (Task 2):** Direct top-level menu item for Numbers allowed immediate discovery and zero-friction task completion.                                                                                                                              | None required; confirms top-level menu items work reliably.                                                                                                                                              |
| _"Käyttöliittymä intuitiivinen, ja helppokäyttöinen (käyttäjäystävällisyys hyvää!)"_<br>_(Translation: "The user interface is intuitive and easy to use (good usability!)")_ | **Positive Usability:** Interactive tools (converter, toggles, search) were immediately understandable once reached.                                                                                                                                     | None required.                                                                                                                                                                                           |
| _"Asettelut selkeät (hyvää!)"_<br>_(Translation: "Layouts are clear (good!)")_                                                                                               | **Visual Clarity:** Card structure, spacing, and typography presented information cleanly without clutter.                                                                                                                                               | None required.                                                                                                                                                                                           |

---

## Closing Evaluation

- **Mandatory Question Asked:** _"Could you have done it without me in the room?"_
- **Tester's Verbatim Answer:** _"For the numbers converter and general tools, yes, completely. For the café dialogue, I needed a hint to know it was inside the Vocabulary tab—with clearer menu labeling, I could do both alone."_
- **Post-Test Resolution:** Implemented the navigation label update (`Vocabulary & Dialogues`) and committed the fix to directly resolve the single barrier identified during testing.
