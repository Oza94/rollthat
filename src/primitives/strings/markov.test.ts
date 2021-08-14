import { randomInt } from "./../numbers";
import {
  buildMarkovModel,
  markovString,
  markovStrings,
  MARKOV_ENDTOK,
  MARKOV_STARTTOK,
  rawMarkovString,
} from "./markov";
import {
  dataset1BisMock,
  dataset1Mock,
  dataset2Mock,
  model1Mock,
  model2Mock,
} from "./markov.mocks";

jest.mock("./../numbers");

const randomIntMock = randomInt as jest.Mock;

describe("buildMarkovModal()", () => {
  test("should build a markov model", () => {
    expect(buildMarkovModel(dataset1Mock)).toEqual(model1Mock);
  });

  test("should build a markov with custom separator", () => {
    expect(buildMarkovModel(dataset2Mock, { separator: "" })).toEqual(
      model2Mock
    );
  });

  test("should build a markov with custom splitToken func", () => {
    expect(
      buildMarkovModel(dataset1BisMock, {
        splitInput: (token) => token.split(/[0-9]+/g),
      })
    ).toEqual(model1Mock);
  });
});

describe("rawMarkovString()", () => {
  test('should generate "bas"', () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0);

    expect(rawMarkovString(model2Mock)).toBe("bas");
  });

  test("should throw when stuck in infinite loop", () => {
    randomIntMock.mockReturnValueOnce(0);

    expect(() => rawMarkovString(model2Mock)).toThrow();
  });

  test('should generate "bas" since minimum = 3', () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(0);

    expect(rawMarkovString(model2Mock, { min: 3 })).toBe("bas");
  });

  test("should throw when it fails to respect minimum length", () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0);

    expect(() => rawMarkovString(model2Mock, { min: 5 })).toThrow();
  });
});

describe("markovString()", () => {
  test('should generate "bas"', () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(0);

    expect(markovString(model2Mock)).toBe("bas");
  });

  test("should return null when it fails to generate a string", () => {
    randomIntMock.mockReturnValue(0);

    expect(markovString(model2Mock)).toBe(null);
  });

  test('should generate "bas" since minimum = 3', () => {
    randomIntMock
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(4)
      .mockReturnValueOnce(0);

    expect(markovString(model2Mock, { min: 3 })).toBe("bas");
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

    expect(markovString(model2Mock, { max: 2 })).toBe("ba");
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

    expect(markovString(model2Mock, { exclude: ["bas"] })).toEqual("ba");
  });

  test("should throw if throwOnMaxTries is true", () => {
    randomIntMock.mockReturnValue(0);

    expect(() => markovString(model2Mock, { throwOnMaxTries: true })).toThrow();
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

    expect(markovStrings(model2Mock, 2)).toEqual(["bas", "bas"]);
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

    expect(markovStrings(model2Mock, 2, { uniq: true })).toEqual(["bas"]);
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

    expect(markovStrings(model2Mock, 2, { uniq: true })).toEqual(["bas", "ba"]);
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

    expect(
      markovStrings(model2Mock, 1, { uniq: true, exclude: ["bas"] })
    ).toEqual(["ba"]);
  });

  test("should generate zero strings if generation fails", () => {
    randomIntMock.mockReturnValue(0);

    expect(markovStrings(model2Mock, 2)).toEqual([]);
  });

  test("should throw if generation fails", () => {
    randomIntMock.mockReturnValue(0);

    expect(() =>
      markovStrings(model2Mock, 2, { throwOnMaxTries: true })
    ).toThrow();
  });
});
