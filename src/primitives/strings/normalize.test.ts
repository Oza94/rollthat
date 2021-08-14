import { normalize } from "./normalize";

describe("normalize()", () => {
  test("should lower, trim and remove diacritices by default", () => {
    expect(normalize(" Mètre  ")).toBe("metre");
  });

  test("should trim and remove diacritics", () => {
    expect(normalize(" Mètre  ", { lower: false })).toBe("Metre");
  });

  test("should trim and uppercase", () => {
    expect(normalize(" Mètre  ", { upper: true, diacritics: true })).toBe(
      "MÈTRE"
    );
  });

  test('"all" accents', () => {
    expect(normalize("éèêë ÉÈËË óòõôö ÓÒÕÔÖ à À ïî ÏÎ", { lower: false })).toBe(
      "eeee EEEE ooooo OOOOO a A ii II"
    );
  });
});
