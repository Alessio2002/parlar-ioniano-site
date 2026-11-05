import { numberToIonian } from "../js/numbers.js";

const tests = [
  {
    name: "T01 p43: 2000 dumilla (-milla form)",
    test: () => numberToIonian(2000) === "dumilla",
  },
  {
    name: "T02 p54: 58 vowel clipping (Cinquantoto)",
    test: () => numberToIonian(58) === "cinquantoto",
  },
  {
    name: "T03 p54: 320 dash rule (Trecento-vinti)",
    test: () => numberToIonian(320) === "trecento-vinti",
  },
  {
    name: "T04 p44: 19000 standard form (Decenovemilla)",
    test: () => numberToIonian(19000) === "decenovemilla",
  },
  {
    name: "T05 p42: 11 undece",
    test: () => numberToIonian(11) === "undece",
  },
  {
    name: "T06 p44: 319 compound",
    test: () => numberToIonian(319) === "trecentodecenove",
  },
  {
    name: "T07: Gender Agreement (1 feminine -> una)",
    test: () => numberToIonian(1, "fem") === "una",
  },
  {
    name: "T08: Scale Check (1,000,000,000,000 -> bilione)",
    test: () => numberToIonian(1000000000000) === "bilione",
  },
];

const listEl = document.getElementById("test-list");
const resultsEl = document.getElementById("test-results");
let passedCount = 0;

tests.forEach((t) => {
  let passed = false;
  try {
    passed = t.test();
  } catch (err) {
    passed = false;
  }

  if (passed) passedCount++;

  const li = document.createElement("li");
  li.className = `list-group-item d-flex justify-content-between align-items-center ${
    passed ? "list-group-item-success" : "list-group-item-danger"
  }`;
  li.innerHTML = `<span>${t.name}</span><span class="badge ${
    passed ? "bg-success" : "bg-danger"
  }">${passed ? "PASS" : "FAIL"}</span>`;
  listEl.appendChild(li);
});

resultsEl.innerHTML = `<div class="alert ${
  passedCount === tests.length ? "alert-success" : "alert-danger"
}"><strong>${passedCount} / ${tests.length}</strong> tests passing.</div>`;
