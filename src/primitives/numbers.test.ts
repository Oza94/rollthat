import { randomFloat, randomInt } from "./numbers";

describe("numbers", () => {
  let randSpy: jest.SpyInstance;

  beforeEach(() => {
    randSpy = jest.spyOn(Math, "random").mockReturnValue(0);
  });

  describe("randomFloat()", () => {
    test("should return lowest bound", () => {
      randSpy.mockReturnValue(0);

      expect(randomFloat(0, 3)).toBe(0);
      expect(randomFloat(0.575, 1)).toBe(0.575);
      expect(randomFloat(-10.22, 0)).toBe(-10.22);
    });

    test("should middle", () => {
      randSpy.mockReturnValue(0.5);

      expect(randomFloat(0, 1)).toBe(0.5);
      expect(randomFloat(0, 3)).toBe(1.5);
    });
  });

  describe("randomInt()", () => {
    test("should return lowest bound", () => {
      randSpy.mockReturnValue(0);

      expect(randomInt(0, 3)).toBe(0);
      expect(randomInt(10, 13)).toBe(10);
      expect(randomInt(-10, 0)).toBe(-10);
    });

    test("should return greatest bound - 1", () => {
      randSpy.mockReturnValue(0.999999);

      expect(randomInt(0, 3)).toBe(2);
      expect(randomInt(10, 13)).toBe(12);
      expect(randomInt(-10, -5)).toBe(-6);
    });

    test("should return middle", () => {
      randSpy.mockReturnValue(0.5);

      expect(randomInt(0, 3)).toBe(1);
      expect(randomInt(0, 10)).toBe(5);
    });
  });
});
