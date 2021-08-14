import { splitBySyllablesFrench } from "./syllables";

describe("splitBySyllablesFrench()", () => {
  test("should return 1 syllable", () => {
    expect(splitBySyllablesFrench("sac")).toEqual(["sac"]);
    expect(splitBySyllablesFrench("oui")).toEqual(["oui"]);
    expect(splitBySyllablesFrench("non")).toEqual(["non"]);
  });

  test("should split between 2 consonants", () => {
    expect(splitBySyllablesFrench("manger")).toEqual(["man", "ger"]);
    expect(splitBySyllablesFrench("printemps")).toEqual(["prin", "temps"]);
    expect(splitBySyllablesFrench("bonjour")).toEqual(["bon", "jour"]);
    expect(splitBySyllablesFrench("elle")).toEqual(["el", "le"]);
    expect(splitBySyllablesFrench("arrêter")).toEqual(["ar", "rê", "ter"]);
    expect(splitBySyllablesFrench("trousse")).toEqual(["trous", "se"]);
  });

  test("should split between consonants and vowels", () => {
    expect(splitBySyllablesFrench("salade")).toEqual(["sa", "la", "de"]);
    expect(splitBySyllablesFrench("voiture")).toEqual(["voi", "tu", "re"]);
    expect(splitBySyllablesFrench("aube")).toEqual(["au", "be"]);
    expect(splitBySyllablesFrench("lapin")).toEqual(["la", "pin"]);
  });

  test("3 consonant syllables", () => {
    expect(splitBySyllablesFrench("compter")).toEqual(["comp", "ter"]);
  });

  test("two identical consonants", () => {
    expect(splitBySyllablesFrench("elle")).toEqual(["el", "le"]);
    expect(splitBySyllablesFrench("battre")).toEqual(["bat", "tre"]);
  });

  test.skip("one-letter syllables", () => {
    expect(splitBySyllablesFrench("abattre")).toEqual(["a", "bat"]);
  });

  test.skip("consonants / vowels mixed cases", () => {
    expect(splitBySyllablesFrench("altitude")).toEqual([
      "al",
      "ti",
      "tu",
      "de",
    ]);
  });

  test("monosound consonant", () => {
    expect(splitBySyllablesFrench("entrer")).toEqual(["en", "trer"]);
    expect(splitBySyllablesFrench("oiseau")).toEqual(["oi", "seau"]);
    expect(splitBySyllablesFrench("arbre")).toEqual(["ar", "bre"]);
    expect(splitBySyllablesFrench("chercher")).toEqual(["cher", "cher"]);
    expect(splitBySyllablesFrench("marcher")).toEqual(["mar", "cher"]);
    expect(splitBySyllablesFrench("montagne")).toEqual(["mon", "ta", "gne"]);
    expect(splitBySyllablesFrench("arthrite")).toEqual(["ar", "thri", "te"]);
    expect(splitBySyllablesFrench("téléphone")).toEqual([
      "té",
      "lé",
      "pho",
      "ne",
    ]);
    expect(splitBySyllablesFrench("thermomètre")).toEqual([
      "ther",
      "mo",
      "mè",
      "tre",
    ]);
  });

  test("3-letters & 4-letters syllables", () => {
    expect(splitBySyllablesFrench("particulier")).toEqual([
      "par",
      "ti",
      "cu",
      "lier",
    ]);
  });

  test("Uppercase", () => {
    expect(splitBySyllablesFrench("MÈTRE")).toEqual(["MÈ", "TRE"]);
  });
});
