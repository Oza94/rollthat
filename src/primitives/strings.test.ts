import { randomInt } from "./numbers";
import {
  buildMarkovModel,
  markovString,
  markovStrings,
  MARKOV_ENDTOK,
  MARKOV_STARTTOK,
  rawMarkovString,
} from "./strings";

jest.mock("./numbers");

const randomIntMock = randomInt as jest.Mock;

describe("buildMarkovModal()", () => {
  test("should build a markov model", () => {
    expect(
      buildMarkovModel(["a good start", "the good start", "a good end"])
    ).toEqual({
      tokens: {
        [MARKOV_STARTTOK]: {
          total: 3,
          items: [
            { value: "a", weight: 2 },
            { value: "the", weight: 1 },
          ],
        },
        a: {
          total: 2,
          items: [{ value: "good", weight: 2 }],
        },
        the: {
          total: 1,
          items: [{ value: "good", weight: 1 }],
        },
        good: {
          total: 3,
          items: [
            { value: "start", weight: 2 },
            { value: "end", weight: 1 },
          ],
        },
        start: {
          total: 2,
          items: [{ value: MARKOV_ENDTOK, weight: 2 }],
        },
        end: {
          total: 1,
          items: [{ value: MARKOV_ENDTOK, weight: 1 }],
        },
      },
      separator: " ",
    });
  });

  test("should build a markov with custom separator", () => {
    expect(buildMarkovModel(["banana", "ananas"], "")).toEqual({
      separator: "",
      tokens: {
        [MARKOV_STARTTOK]: {
          items: [
            {
              value: "b",
              weight: 1,
            },
            {
              value: "a",
              weight: 1,
            },
          ],
          total: 2,
        },
        a: {
          items: [
            {
              value: "n",
              weight: 4,
            },
            {
              value: MARKOV_ENDTOK,
              weight: 1,
            },
            {
              value: "s",
              weight: 1,
            },
          ],
          total: 6,
        },
        b: {
          items: [
            {
              value: "a",
              weight: 1,
            },
          ],
          total: 1,
        },
        n: {
          items: [
            {
              value: "a",
              weight: 4,
            },
          ],
          total: 4,
        },
        s: {
          items: [
            {
              value: MARKOV_ENDTOK,
              weight: 1,
            },
          ],
          total: 1,
        },
      },
    });
  });
});

const model = {
  separator: "",
  tokens: {
    [MARKOV_STARTTOK]: {
      items: [
        {
          value: "b",
          weight: 1,
        },
        {
          value: "a",
          weight: 1,
        },
      ],
      total: 2,
    },
    a: {
      items: [
        {
          value: "n",
          weight: 4,
        },
        {
          value: MARKOV_ENDTOK,
          weight: 1,
        },
        {
          value: "s",
          weight: 1,
        },
      ],
      total: 6,
    },
    b: {
      items: [
        {
          value: "a",
          weight: 1,
        },
      ],
      total: 1,
    },
    n: {
      items: [
        {
          value: "a",
          weight: 4,
        },
      ],
      total: 4,
    },
    s: {
      items: [
        {
          value: MARKOV_ENDTOK,
          weight: 1,
        },
      ],
      total: 1,
    },
  },
};

describe("rawMarkovString()", () => {
  test('should generate "bas"', () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0);

    expect(rawMarkovString(model)).toBe("bas");
  });

  test("should throw when stuck in infinite loop", () => {
    randomIntMock.mockReturnValueOnce(0);

    expect(() => rawMarkovString(model)).toThrow();
  });

  test('should generate "bas" since minimum = 3', () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(0);

    expect(rawMarkovString(model, { min: 3 })).toBe("bas");
  });

  test("should throw when it fails to respect minimum length", () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0);

    expect(() => rawMarkovString(model, { min: 5 })).toThrow();
  });
});

describe("markovString()", () => {
  test('should generate "bas"', () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0);

    expect(markovString(model)).toBe("bas");
  });

  test("should return null when it fails to generate a string", () => {
    randomIntMock.mockReturnValue(0);

    expect(markovString(model)).toBe(null);
  });

  test('should generate "bas" since minimum = 3', () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(0);

    expect(markovString(model, { min: 3 })).toBe("bas");
  });

  test("should retry to respect maximum", () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(4);

    expect(markovString(model, { max: 2 })).toBe("ba");
  });

  test("should exclude given result from input", () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(4);

    expect(markovString(model, { exclude: ["bas"] })).toEqual("ba");
  });

  test("should throw if throwOnMaxTries is true", () => {
    randomIntMock.mockReturnValue(0);

    expect(() => markovString(model, { throwOnMaxTries: true })).toThrow();
  });
});

describe("markovStrings()", () => {
  test("should generate two strings", () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0);

    expect(markovStrings(model, 2)).toEqual(["bas", "bas"]);
  });

  test("should generate one string with uniq = true", () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0);

    expect(markovStrings(model, 2, { uniq: true })).toEqual(["bas"]);
  });

  test("should generate rerty when not uniq", () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(4);

    expect(markovStrings(model, 2, { uniq: true })).toEqual(["bas", "ba"]);
  });

  test("should exclude given result from input", () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(4);

    expect(markovStrings(model, 1, { uniq: true, exclude: ["bas"] })).toEqual([
      "ba",
    ]);
  });

  test("should generate zero strings if generation fails", () => {
    randomIntMock.mockReturnValue(0);

    expect(markovStrings(model, 2)).toEqual([]);
  });

  test("should throw if generation fails", () => {
    randomIntMock.mockReturnValue(0);

    expect(() => markovStrings(model, 2, { throwOnMaxTries: true })).toThrow();
  });
});
