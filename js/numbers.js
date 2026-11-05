const UNITS = {
  0: "zero",
  1: { masc: "uno", fem: "una", neut: "unu" },
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
  { value: 1000000000000, singular: "bilione", plural: "bilioni" },
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

  if (isNaN(n) || n < -999999999999999 || n > 999999999999999) {
    throw new RangeError(
      "Input must be a valid integer between -999,999,999,999,999 and 999,999,999,999,999."
    );
  }

  if (n === 0) return UNITS[0];

  const isNegative = n < 0;
  const absN = Math.abs(n);

  const activeGender = gender === "neut" && absN >= 2 ? "fem" : gender;

  let result = "";

  if (absN < 1000) {
    result = convertHundreds(absN, activeGender);
  } else {
    let remaining = absN;

    for (const scale of SCALES) {
      if (remaining >= scale.value) {
        const count = Math.floor(remaining / scale.value);
        remaining %= scale.value;

        let scaleChunk = "";
        if (count === 1) {
          scaleChunk = scale.singular;
        } else {
          let prefix = convertHundreds(count, "masc");
          if (/^[aeiouàèéìòù]/i.test(scale.plural) && prefix.endsWith("o")) {
            prefix = prefix.slice(0, -1);
          }
          const scaleWord = scale.value === 1000 ? "milla" : scale.plural;
          scaleChunk = prefix + scaleWord;
        }

        result += (result ? "-" : "") + scaleChunk;
      }
    }

    if (remaining > 0) {
      const remStr = convertHundreds(remaining, activeGender);
      result += (result ? "-" : "") + remStr;
    }
  }

  return isNegative ? `mino ${result}` : result;
}

export function getOrdinalHelper(num, gender = "masc") {
  const n = parseInt(num, 10);

  if (isNaN(n) || n < 1 || n > 999999999999999) {
    throw new RangeError(
      "Ordinal numbers must be positive integers between 1 and 999,999,999,999,999."
    );
  }

  // Helper to build a single ordinal form based on a target ending (-o, -a, -u, -i, -e)
  const buildForm = (ending) => {
    if (n === 1) return `prim${ending}`;
    if (n === 2) return `second${ending}`;
    if (n === 3) return `terzz${ending}`;
    if (n === 4) return `quart${ending}`;
    if (n === 5) return `quint${ending}`;
    if (n === 6) return `seist${ending}`;
    if (n === 7) return `setêm${ending}`;
    if (n === 8) return `otav${ending}`;
    if (n === 9) return `non${ending}`;
    if (n === 10) return `decesim${ending}`;

    const cardinalStr = numberToIonian(n, "masc");
    const ordinalStem = cardinalStr.replace(/[aeiouàèéìòù]$/i, "") + "esim";
    return ordinalStem + ending;
  };

  if (gender === "masc") {
    return {
      singular: buildForm("o"),
      plural: buildForm("i"),
    };
  } else if (gender === "fem") {
    return {
      singular: buildForm("a"),
      plural: buildForm("e"),
    };
  } else if (gender === "neut") {
    // Neuter has no plural, shifts to feminine plural (-e)
    return {
      singular: buildForm("u"),
      plural: buildForm("e"),
      isNeuter: true,
    };
  }

  return { singular: buildForm("o"), plural: buildForm("i") };
}
