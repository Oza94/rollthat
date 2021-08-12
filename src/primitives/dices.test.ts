import { rollDice, rollDices } from "./dices";
import { randomInt } from "./numbers";

jest.mock("./numbers");

const randomIntMock = randomInt as jest.Mock;

describe("dices", () => {
  describe("rollDice()", () => {
    test("should return minimum", () => {
      randomIntMock.mockReturnValue(0);

      expect(rollDice(6)).toBe(1);
      expect(rollDice(100)).toBe(1);
    });

    test("should return maximum", () => {
      randomIntMock.mockReturnValue(5);

      expect(rollDice(6)).toBe(6);

      randomIntMock.mockReturnValue(99);

      expect(rollDice(100)).toBe(100);
    });
  });

  describe("rollDices()", () => {
    test("should return result as well as individual rolls", () => {
      randomIntMock
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(5)
        .mockReturnValueOnce(2);

      expect(rollDices(3, 6)).toEqual({
        result: 10,
        rolls: [1, 6, 3],
      });
    });
  });
});
