import { levenshtein } from "./levenshtein";

describe("levenshtein()", () => {
  test("should return 0", () => {
    expect(levenshtein("abc", "abc")).toBe(0);
  });

  test("should return 1", () => {
    expect(levenshtein("abc", "abcd")).toBe(1);
  });

  test("should return 1", () => {
    expect(levenshtein("abc", "abdc")).toBe(1);
  });

  test("should return 3", () => {
    expect(levenshtein("abc", "def")).toBe(3);
  });
});
