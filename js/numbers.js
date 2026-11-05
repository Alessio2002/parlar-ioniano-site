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
  {
    value: 1000000000000000000000n,
    singular: "quintilione",
    plural: "quintilioni",
  },
  { value: 1000000000000000000n, singular: "trilione", plural: "trilioni" },
  { value: 1000000000000000n, singular: "biliardo", plural: "biliardi" },
  { value: 1000000000000n, singular: "bilione", plural: "bilioni" },
  { value: 1000000000n, singular: "miliardo", plural: "miliardi" },
  { value: 1000000n, singular: "milione", plural: "milioni" },
  { value: 1000n, singular: "mille", plural: "milla" },
];

const MAX_LIMIT = 999999999999999999999n;
const MIN_LIMIT = -999999999999999999999n;

function getUnitStr(n, gender = "masc") {
  const unit = UNITS[Number(n)];
  if (typeof unit === "object") {
    return unit[gender] || unit.masc;
  }
  return unit || "";
}

function convertTens(n, gender = "masc") {
  if (n < 10n) return getUnitStr(n, gender);
  if (n >= 10n && n < 20n) return TEENS[Number(n)];

  const ten = (n / 10n) * 10n;
  const unit = n % 10n;

  if (unit === 0n) return TENS[Number(ten)];

  const tenStr = TENS[Number(ten)];
  const unitStr = getUnitStr(unit, gender);

  if (/^[aeiouàèéìòù]/i.test(unitStr)) {
    return tenStr.slice(0, -1) + unitStr;
  }

  return tenStr + unitStr;
}

function convertHundreds(n, gender = "masc") {
  if (n < 100n) return convertTens(n, gender);

  const hundred = (n / 100n) * 100n;
  const remainder = n % 100n;

  if (remainder === 0n) return HUNDREDS[Number(hundred)];

  const hundredStr = HUNDREDS[Number(hundred)];
  const remainderStr = convertTens(remainder, gender);

  if (remainder >= 20n) {
    return `${hundredStr}-${remainderStr}`;
  }

  return hundredStr + remainderStr;
}

export function numberToIonian(num, gender = "masc") {
  let n;
  try {
    n = BigInt(num);
  } catch (e) {
    throw new RangeError("Input must be a valid integer.");
  }

  if (n < MIN_LIMIT || n > MAX_LIMIT) {
    throw new RangeError(
      "Input must be between -999,999,999,999,999,999,999 and 999,999,999,999,999,999,999."
    );
  }

  if (n === 0n) return UNITS[0];

  const isNegative = n < 0n;
  const absN = isNegative ? -n : n;

  const activeGender = gender === "neut" && absN >= 2n ? "fem" : gender;

  let result = "";

  if (absN < 1000n) {
    result = convertHundreds(absN, activeGender);
  } else {
    let remaining = absN;

    for (const scale of SCALES) {
      if (remaining >= scale.value) {
        const count = remaining / scale.value;
        remaining %= scale.value;

        let scaleChunk = "";
        if (count === 1n) {
          scaleChunk = scale.singular;
        } else {
          let prefix = convertHundreds(count, "masc");
          if (/^[aeiouàèéìòù]/i.test(scale.plural) && prefix.endsWith("o")) {
            prefix = prefix.slice(0, -1);
          }
          const scaleWord = scale.value === 1000n ? "milla" : scale.plural;
          scaleChunk = prefix + scaleWord;
        }

        result += (result ? "-" : "") + scaleChunk;
      }
    }

    if (remaining > 0n) {
      const remStr = convertHundreds(remaining, activeGender);
      result += (result ? "-" : "") + remStr;
    }
  }

  return isNegative ? `mino ${result}` : result;
}

export function getOrdinalHelper(num, gender = "masc") {
  let n;
  try {
    n = BigInt(num);
  } catch (e) {
    throw new RangeError("Input must be a valid integer.");
  }

  if (n < 1n || n > MAX_LIMIT) {
    throw new RangeError(
      "Ordinal numbers must be positive integers up to 999,999,999,999,999,999,999."
    );
  }

  const endings = {
    masc: "o",
    fem: "a",
    neut: "u",
    masc_pl: "i",
    fem_pl: "e",
  };

  const activeGender = endings[gender] ? gender : "masc";
  const ending = endings[activeGender];

  const buildForm = (targetN, targetEnding) => {
    if (targetN === 1n) return `prim${targetEnding}`;
    if (targetN === 2n) return `second${targetEnding}`;
    if (targetN === 3n) return `terzz${targetEnding}`;
    if (targetN === 4n) return `quart${targetEnding}`;
    if (targetN === 5n) return `quint${targetEnding}`;
    if (targetN === 6n) return `seist${targetEnding}`;
    if (targetN === 7n) return `setêm${targetEnding}`;
    if (targetN === 8n) return `otav${targetEnding}`;
    if (targetN === 9n) return `non${targetEnding}`;
    if (targetN === 10n) return `decesim${targetEnding}`;

    const cardinalStr = numberToIonian(targetN, "masc");
    const ordinalStem = cardinalStr.replace(/[aeiouàèéìòù]$/i, "") + "esim";
    return ordinalStem + targetEnding;
  };

  if (gender === "masc") {
    return {
      singular: buildForm(n, "o"),
      plural: buildForm(n, "i"),
    };
  } else if (gender === "fem") {
    return {
      singular: buildForm(n, "a"),
      plural: buildForm(n, "e"),
    };
  } else if (gender === "neut") {
    return {
      singular: buildForm(n, "u"),
      plural: buildForm(n, "e"),
      isNeuter: true,
    };
  }

  return { singular: buildForm(n, "o"), plural: buildForm(n, "i") };
}
