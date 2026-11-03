const UNITS = {
  0: "zero",
  1: { masc: "uno", fem: "una", neut: "unu" },
  // Neuter plural uses feminine forms (dua, tria) because neuter has no plural
  2: { masc: "du", fem: "dua", neut: "dua" },
  3: { masc: "tre", fem: "tria", neut: "tria" },
  4: "quatro",
  5: "cinco",
  6: "sei",
  7: "setê",
  8: "oto",
  9: "nove",
};

const TEENS = {
  10: "dece",
  11: "undece",
  12: "dudece",
  13: "tredece",
  14: "quatrodece",
  15: "quindece",
  16: "seidece",
  17: "decesetê",
  18: "decioto",
  19: "decenove",
};

const TENS = {
  20: "vinti",
  30: "trenta",
  40: "quaranta",
  50: "cinquanta",
  60: "seiquanta",
  70: "seganta",
  80: "oiganta",
  90: "novequanta",
};

const HUNDREDS = {
  100: "cento",
  200: "ducento",
  300: "trecento",
  400: "quatrocento",
  500: "cincocento",
  600: "seicento",
  700: "secento",
  800: "oicento",
  900: "novecento",
};

const SCALES = [
  { value: 1000000000000, singular: "biliardo", plural: "biliardi" },
  { value: 1000000000, singular: "miliardo", plural: "miliardi" },
  { value: 1000000, singular: "milione", plural: "milioni" },
  { value: 1000, singular: "mille", plural: "milla" },
];

function getUnitStr(n, gender = "masc") {
  const unit = UNITS[n];
  if (typeof unit === "object") {
    return unit[gender] || unit.masc;
  }
  return unit || "";
}

function convertTens(n, gender = "masc") {
  if (n < 10) return getUnitStr(n, gender);
  if (n >= 10 && n < 20) return TEENS[n];

  const ten = Math.floor(n / 10) * 10;
  const unit = n % 10;

  if (unit === 0) return TENS[ten];

  const tenStr = TENS[ten];
  const unitStr = getUnitStr(unit, gender);

  if (/^[aeiouàèéìòù]/i.test(unitStr)) {
    return tenStr.slice(0, -1) + unitStr;
  }

  return tenStr + unitStr;
}

function convertHundreds(n, gender = "masc") {
  if (n < 100) return convertTens(n, gender);

  const hundred = Math.floor(n / 100) * 100;
  const remainder = n % 100;

  if (remainder === 0) return HUNDREDS[hundred];

  const hundredStr = HUNDREDS[hundred];
  const remainderStr = convertTens(remainder, gender);

  if (remainder >= 20) {
    return `${hundredStr}-${remainderStr}`;
  }

  return hundredStr + remainderStr;
}

export function numberToIonian(num, gender = "masc") {
  const n = parseInt(num, 10);

  if (isNaN(n) || n < 0 || n > 999999999999999) {
    throw new RangeError(
      "Input must be a valid integer between 0 and 999,999,999,999,999."
    );
  }

  if (n === 0) return UNITS[0];

  const activeGender = gender === "neut" && n >= 2 ? "fem" : gender;

  if (n < 1000) {
    return convertHundreds(n, activeGender);
  }

  let result = "";
  let remaining = n;

  for (const scale of SCALES) {
    if (remaining >= scale.value) {
      const count = Math.floor(remaining / scale.value);
      remaining %= scale.value;

      if (count === 1) {
        result += (result ? " " : "") + scale.singular;
      } else {
        let prefix = convertHundreds(count, "masc");
        if (/^[aeiouàèéìòù]/i.test(scale.plural) && prefix.endsWith("o")) {
          prefix = prefix.slice(0, -1);
        }
        const scaleWord = scale.value === 1000 ? "milla" : scale.plural;
        result += (result ? " " : "") + prefix + scaleWord;
      }
    }
  }

  if (remaining > 0) {
    const remStr = convertHundreds(remaining, activeGender);
    // Extend hyphenation rule universally across scale boundaries when remainder is >= 20
    const separator = remaining >= 20 ? "-" : " ";
    result += (result ? separator : "") + remStr;
  }

  return result;
}

export function getOrdinalHelper(n, gender = "masc") {
  const activeGender = gender === "neut" && n >= 2 ? "fem" : gender;

  const ORDINALS_BASE = {
    1: { masc: "primo", fem: "prima", neut: "primu" },
    2: { masc: "secondo", fem: "seconda", neut: "seconda" },
    3: { masc: "terzzo", fem: "terzza", neut: "terzza" },
    4: { masc: "quarto", fem: "quarta", neut: "quarta" },
    5: { masc: "quinto", fem: "quinta", neut: "quinta" },
    6: { masc: "seisto", fem: "seista", neut: "seista" },
    7: { masc: "setêmo", fem: "setêma", neut: "setêma" },
    8: { masc: "otavo", fem: "otava", neut: "otava" },
    9: { masc: "nono", fem: "nona", neut: "nona" },
    10: { masc: "decesimo", fem: "decesima", neut: "decesima" },
  };

  if (ORDINALS_BASE[n]) {
    return ORDINALS_BASE[n][activeGender] || ORDINALS_BASE[n].masc;
  }
  return `${numberToIonian(n, activeGender)}esimo`;
}
