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

    // Phonetics Overview
    if (data.phonetics_overview) {
      html += `<h2>Phonetics Overview</h2>
                     <p><strong>Vowels:</strong> ${data.phonetics_overview.vowels}</p>
                     <p><strong>Consonants:</strong> ${data.phonetics_overview.consonants}</p>`;
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
