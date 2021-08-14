function includesLetters(str: string, letters: string[]) {
  for (let i = 0; i < str.length; i++) {
    if (letters.includes(str[i])) {
      return true;
    }
  }
  return false;
}

const VOWELS = /[aàeéèêëyuùiîïoô]+/i;
const CONSONANTS = /[bcdfghjklmnpqrstvwxz]+/i;
const MONOSOUND = /(ch|ph|th|gn|[bcdfghjklmnpqrstvwxys][rl])/i;

export function splitBySyllablesFrench(str: string) {
  if (!str.length) {
    return [];
  }

  const output: string[] = [];
  let buffer = "";

  for (let i = 0; i < str.length; ) {
    const csMatch = str.slice(i).match(CONSONANTS);
    if (csMatch?.index === 0) {
      buffer += csMatch[0];
      i += csMatch[0].length;
    }

    const vowMatch = str.slice(i).match(VOWELS);
    if (vowMatch?.index === 0) {
      buffer += vowMatch[0];
      i += vowMatch[0].length;
    }

    const remVowMatch = str.slice(i).match(VOWELS);
    if (!remVowMatch) {
      // If no vowels remaining, add rest of word
      const slice = str.slice(i);
      buffer += slice;
      i += slice.length;
    } else {
      const ceMatch = str.slice(i).match(CONSONANTS);
      if (ceMatch?.index === 0 && ceMatch[0].length > 1) {
        let slice = ceMatch[0];
        let split = false;
        const scMatch = slice.match(/(.)\1+/);
        if (typeof scMatch?.index === "number") {
          // Special case, following same consonants e.g. "ll"
          slice = slice.slice(0, scMatch.index + 1);
          split = true;
        }
        const monoMatch = slice.match(MONOSOUND);
        if (typeof monoMatch?.index === "number") {
          slice = slice.slice(0, monoMatch.index);
          split = true;
        }
        if (!split) {
          // Match all following consonants, keep consonants.length - 1
          slice = slice.slice(0, ceMatch[0].length - 1);
        }
        buffer += slice;
        i += slice.length;
      }
    }

    //console.log("enditer", str, i, buffer);
    output.push(buffer);
    buffer = "";
  }

  return output;
  /*const output: string[] = [];
  let buffer = "";
  let hadVowel = false;

  for (let i = 0; i < str.length; i++) {
    const l = str[i];
    const isVowel = FR_VOWELS.includes(l);
    const lastIsVowel = FR_VOWELS.includes(buffer[buffer.length - 1]);

    if (buffer.length === 0) {
      buffer = l;
      hadVowel = false;
      continue;
    }

    if (
      isVowel ||
      !includesLetters(str.slice(i), FR_VOWELS) ||
      (lastIsVowel && l === "n") ||
      (!hadVowel && buffer.length === 1)
    ) {
      buffer += l;
      hadVowel = hadVowel || isVowel;
    } else {
      output.push(buffer);
      hadVowel = false;
      buffer = l;
    }
  }
  output.push(buffer);

  return output;*/
}
