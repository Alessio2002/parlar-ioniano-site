// js/data.js

export async function loadJSON(filePath) {
  const response = await fetch(filePath);
  if (!response.ok) {
    throw new Error(
      `Failed to load file: ${filePath} (Status: ${response.status})`
    );
  }
  return await response.json();
}

export async function renderAlphabetPage(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "<p>Loading...</p>";

  try {
    const data = await loadJSON(filePath);

    let html = `<h1>Ionian Alphabet & Pronunciation</h1>`;

    // Collapsible & Non-Linguist Friendly Complete IPA Guide with Dividers & Stress/Marker Explanations
    html += `
      <div class="card mb-4 shadow-sm border-secondary">
        <div class="card-header bg-secondary text-white d-flex justify-content-between align-items-center" style="cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#ipaLegendCollapse" aria-expanded="false" aria-controls="ipaLegendCollapse">
          <span class="fw-bold">📖 Pronunciation Help: How to Read the IPA Symbols (Click to expand/collapse)</span>
          <span class="badge bg-light text-dark">▼ Toggle Guide</span>
        </div>
        <div class="collapse" id="ipaLegendCollapse">
          <div class="card-body bg-light">
            <p class="text-muted small mb-3">Not familiar with linguistic symbols? Here is a simple everyday guide to what each sound and marker represents:</p>
            
            <h6 class="text-dark fw-bold mb-2">Vowels</h6>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 small mb-3">
              <div class="col"><code>[a]</code> — open 'a' (like the 'a' in <em>father</em>)</div>
              <div class="col"><code>[e]</code> — closed 'e' (like the 'e' in <em>cafe</em>)</div>
              <div class="col"><code>[e]</code> — closed 'é' (like the 'e' in <em>bed</em>, but emphasised with a slight rise in pitch and loudness)</div>
              <div class="col"><code>[ɛ]</code> — open 'è' (like the 'e' in <em>bed</em>)</div>
              <div class="col"><code>[i]</code> — 'ee' sound (like the 'i' in <em>machine</em>)</div>
              <div class="col"><code>[o]</code> — closed 'o' (like the 'o' in <em>note</em>)</div>
              <div class="col"><code>[ɔ]</code> — open 'ò' (like the 'o' in <em>thought</em>)</div>
              <div class="col"><code>[u]</code> — 'oo' sound (like the 'u' in <em>boot</em>)</div>
            </div>

            <hr class="my-3">

            <h6 class="text-dark fw-bold mb-2">Consonants & Special Sounds</h6>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 small mb-3">
              <div class="col"><code>[b]</code> — standard 'b' sound</div>
              <div class="col"><code>[d]</code> — standard 'd' sound</div>
              <div class="col"><code>[f]</code> — standard 'f' sound</div>
              <div class="col"><code>[g]</code> — hard 'g' sound (as in <em>go</em>)</div>
              <div class="col"><code>[j]</code> — 'y' sound (as in <em>yes</em>)</div>
              <div class="col"><code>[k]</code> — hard 'k' sound (as in <em>kite</em>)</div>
              <div class="col"><code>[l]</code> — standard 'l' sound</div>
              <div class="col"><code>[m]</code> — standard 'm' sound</div>
              <div class="col"><code>[n]</code> — standard 'n' sound</div>
              <div class="col"><code>[p]</code> — standard 'p' sound</div>
              <div class="col"><code>[v]</code> — 'v' sound (as in <em>victory</em>)</div>
              <div class="col"><code>[z]</code> — buzzing 'z' sound (as in <em>zero</em>)</div>
              <div class="col"><code>[s]</code> — sharp 's' sound (as in <em>snake</em>)</div>
              <div class="col"><code>[s.s]</code> — double 's' sound (as in <em>pass</em>)</div>
              <div class="col"><code>[t]</code> — standard 't' sound</div>
              <div class="col"><code>[r]</code> — rolled 'r' sound (as in Italian <em>bravo</em>)</div>
              <div class="col"><code>[ɾ]</code> — quick tapped 'r' sound (as in Italian <em>caro</em>)</div>
              <div class="col"><code>[r.r]</code> — double rolled 'r' sound (as in Italian <em>carro</em>)</div>
              <div class="col"><code>[ɟ]</code> — like 'y' in yes, but the tongue is pressed tightly into the roof of the mouth</div>
            </div>

            <hr class="my-3">

            <h6 class="text-dark fw-bold mb-2">Combinations & Complex Sounds</h6>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 small mb-3">
              <div class="col"><code>[t͡ʃ]</code> — 'ch' sound (as in <em>cheese</em>)</div>
              <div class="col"><code>[d͡ʒ]</code> — 'j' sound (as in <em>jump</em>)</div>
              <div class="col"><code>[ʃ]</code> — 'sh' sound (as in <em>shoe</em>)</div>
              <div class="col"><code>[ɲ]</code> — 'ny' sound (as in <em>canyon</em>)</div>
              <div class="col"><code>[ŋ]</code> — 'ng' sound (as in <em>sing</em>)</div>
              <div class="col"><code>[θ]</code> — 'th' sound (as in <em>think</em>)</div>
              <div class="col"><code>[x]</code> — clearing-throat sound (as in Scottish <em>loch</em>)</div>
              <div class="col"><code>[w]</code> — quick 'w' glide sound</div>
            </div>

            <hr class="my-3">

            <h6 class="text-dark fw-bold mb-2">Phonetic Markers & Symbols</h6>
            <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-2 small">
              <div class="col"><code>[ˈ]</code> — primary stress mark (placed right before the stressed syllable)</div>
              <div class="col"><code><'></code> — apostrophe (') is used as an elision marker</div>
              <div class="col"><code>Elision</code> — is the omission of a sound, vowel, consonant, or syllable within a word or between words to make speech faster, smoother, and easier to pronounce</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Alphabet Section
    html += `<h2>Alphabet</h2><table><thead><tr><th>Letter</th><th>IPA / Rules</th></tr></thead><tbody>`;
    data.alphabet.forEach((item) => {
      let detail = "";

      const formatIpa = (ipaVal) => {
        if (!ipaVal) return "";
        if (Array.isArray(ipaVal)) {
          return ipaVal
            .map((i) => (Array.isArray(i) ? i.join(" ") : i))
            .join(" ");
        }
        return ipaVal;
      };

      if (item.ipa) {
        detail = formatIpa(item.ipa);
      }

      if (item.rules) {
        detail = item.rules
          .map((r) => `${r.condition}: ${formatIpa(r.ipa)}`)
          .join("<br>");
      }

      if (item.variants) {
        detail = item.variants
          .map((v) => {
            const label = v.form ? `${v.form}: ` : "";
            const val = formatIpa(v.ipa);
            return `${label}${val}`;
          })
          .join("<br>");
      }

      if (item.voicing_rules) {
        const contexts = item.voicing_rules.voicing_contexts.join(", ");
        detail += `<br><em>Voicing:</em> ${item.voicing_rules.voiced_ipa} when ${contexts}`;
      }

      html += `<tr><td><strong>${item.letter}</strong></td><td>${
        detail || "(none)"
      }</td></tr>`;
    });
    html += `</tbody></table>`;

    // Phonetics Overview Section
    if (data.phonetics_overview) {
      html += `<h2>Phonetics Overview</h2>
               <p><strong>Vowels:</strong> ${data.phonetics_overview.vowels}</p>
               <p><strong>Consonants:</strong> ${data.phonetics_overview.consonants}</p>`;
    }

    // Phonetic Features Section
    if (data.phonetic_features && data.phonetic_features.length > 0) {
      html += `<h2>Phonetic Features</h2><ul>`;
      data.phonetic_features.forEach((feature) => {
        html += `<li>${feature}</li>`;
      });
      html += `</ul>`;
    }

    // Diacritics and Special Combinations Section
    if (data.diacritics_and_combinations) {
      const dio = data.diacritics_and_combinations;
      html += `<h2>Diacritics & Combinations</h2>`;
      if (dio.diacritics_overview) {
        html += `<p>${dio.diacritics_overview}</p>`;
      }

      // Specific combinations table
      if (dio.specific_combinations && dio.specific_combinations.length > 0) {
        html += `<h3>Specific Combinations</h3><table><thead><tr><th>Pattern</th><th>IPA / Notes</th></tr></thead><tbody>`;
        dio.specific_combinations.forEach((c) => {
          const ipaStr = Array.isArray(c.ipa) ? c.ipa.join(" — ") : c.ipa;
          html += `<tr><td><strong>${c.pattern}</strong></td><td>${ipaStr}</td></tr>`;
        });
        html += `</tbody></table>`;
      }

      // Usage notes
      if (dio.diacritic_usage_notes && dio.diacritic_usage_notes.length > 0) {
        html += `<h3>Usage Notes</h3><ul>`;
        dio.diacritic_usage_notes.forEach((note) => {
          html += `<li>${note}</li>`;
        });
        html += `</ul>`;
      }

      // Postalveolar Sequences (Corrected Terminology)
      if (dio.postalveolar_sequences && dio.postalveolar_sequences.length > 0) {
        html += `<h3>Postalveolar Sequences</h3><table><thead><tr><th>Pattern</th><th>IPA</th></tr></thead><tbody>`;
        dio.postalveolar_sequences.forEach((p) => {
          html += `<tr><td><strong>${p.pattern}</strong></td><td>${p.ipa}</td></tr>`;
        });
        html += `</tbody></table>`;
      }

      // Extra rules for C, G, SC
      if (dio.extra_rules_c_g_sc && dio.extra_rules_c_g_sc.length > 0) {
        html += `<h3>Extra Rules for C, G, SC</h3><table><thead><tr><th>Pattern</th><th>IPA / Rules</th></tr></thead><tbody>`;
        dio.extra_rules_c_g_sc.forEach((rule) => {
          let ruleDetail = "";
          if (rule.ipa) {
            ruleDetail = rule.ipa;
          } else if (rule.rules) {
            ruleDetail = rule.rules
              .map((r) => `${r.condition}: ${r.ipa}`)
              .join("<br>");
          }
          html += `<tr><td><strong>${rule.pattern}</strong></td><td>${ruleDetail}</td></tr>`;
        });
        html += `</tbody></table>`;
      }
    }

    // Digraphs Section
    if (data.digraphs) {
      html += `<h2>Digraphs</h2><table><thead><tr><th>Digraph</th><th>IPA / Notes</th></tr></thead><tbody>`;
      data.digraphs.forEach((d) => {
        let ipaText = "";
        if (Array.isArray(d.ipa)) {
          ipaText = d.ipa
            .map((part) => (Array.isArray(part) ? part.join(" ") : part))
            .join(" — ");
        } else {
          ipaText = d.ipa;
        }
        html += `<tr><td><strong>${d.digraph}</strong></td><td>${ipaText}</td></tr>`;
      });
      html += `</tbody></table>`;
    }

    container.innerHTML = html;
  } catch (error) {
    container.innerHTML = `<p class="error" style="color: red;">Error: Could not load data from file <strong>${filePath}</strong>. Please check path or network response.</p>`;
    console.error(error);
  }
}
