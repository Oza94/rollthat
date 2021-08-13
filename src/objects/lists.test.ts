import { randomInt } from "./../primitives/numbers";
import { randomItem, randomItems, createWeightedList } from "./lists";

jest.mock("./../primitives/numbers");

const randomIntMock = randomInt as jest.Mock;

const listMock = ["one", "two", "three"];

const weightedListMock = {
  total: 6,
  items: [
    { value: "one", weight: 1 },
    { value: "two", weight: 2 },
    { value: "three", weight: 3 },
  ],
};

describe("randomItem()", () => {
  describe("simple", () => {
    test("should return element from list", () => {
      randomIntMock
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(1);

      expect(randomItem(listMock)).toBe("one");
      expect(randomItem(listMock)).toBe("three");
      expect(randomItem(listMock)).toBe("two");
    });

    test("should return element from list except excluded", () => {
      randomIntMock.mockReturnValueOnce(0).mockReturnValue(2);

      expect(randomItem(listMock, { exclude: ["one"] })).toBe("two");
      expect(randomItem(listMock, { exclude: ["three"] })).toBe("one");
    });

    test("should error if all list values are excluded", () => {
      expect(() => randomItem(listMock, { exclude: ["one", "two", "three"] }))
        .toThrow;
    });
  });

  describe("weighted", () => {
    test("should return element from weighted list", () => {
      randomIntMock
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(5)
        .mockReturnValueOnce(2);

      expect(randomItem(weightedListMock)).toBe("one");
      expect(randomItem(weightedListMock)).toBe("three");
      expect(randomItem(weightedListMock)).toBe("two");
    });

    test("should return element from weighted list", () => {
      randomIntMock.mockReturnValueOnce(0).mockReturnValueOnce(5);

      expect(randomItem(weightedListMock, { exclude: ["one"] })).toBe("two");
      expect(randomItem(weightedListMock, { exclude: ["three"] })).toBe("one");
    });

    test("should return element from weighted list", () => {
      randomIntMock.mockReturnValueOnce(0);

      expect(() =>
        randomItem(weightedListMock, { exclude: ["one", "two", "three"] })
      ).toThrow();
    });
  });
});

describe("randomItems()", () => {
  describe("simple", () => {
    test("should return array of elements from list", () => {
      randomIntMock
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1);

      expect(randomItems(listMock, 3)).toEqual(["one", "two", "two"]);
    });

    test("should return array of uniques elements from list", () => {
      randomIntMock
        .mockReturnValueOnce(2)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(2);

      expect(randomItems(listMock, 3, { uniq: true })).toEqual([
        "three",
        "one",
        "two",
      ]);
    });

    test("should throw if uniq=true and count > list.length", () => {
      randomIntMock.mockReturnValue(0);

      expect(() => randomItems(listMock, 4, { uniq: true })).toThrow();
    });
  });

  describe("weighted", () => {
    test("should return array of elements from weighted list", () => {
      randomIntMock
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(1)
        .mockReturnValueOnce(1);

      expect(randomItems(weightedListMock, 3)).toEqual(["one", "two", "two"]);
    });

    test("should return array of uniques elements from weighted list", () => {
      randomIntMock
        .mockReturnValueOnce(5)
        .mockReturnValueOnce(0)
        .mockReturnValueOnce(5);

      expect(randomItems(weightedListMock, 3, { uniq: true })).toEqual([
        "three",
        "one",
        "two",
      ]);
    });

    test("should throw if uniq=true and count > list.length", () => {
      randomIntMock.mockReturnValue(0);

      expect(() => randomItems(weightedListMock, 4, { uniq: true })).toThrow();
    });
  });
});

describe("createWeightedList()", () => {
  test("should build a weighted list", () => {
    const list = [
      { value: "one", weight: 1 },
      { value: "two", weight: 2 },
      { value: "three", weight: 3 },
    ];

    expect(createWeightedList(list)).toEqual({
      total: 6,
      items: list,
    });
  });

  test("should build a weighted list with custom weight func", () => {
    expect(
      createWeightedList(
        ["one", "two", "three"],
        (value: string) => value.length
      )
    ).toEqual({
      total: 11,
      items: [
        { value: "one", weight: 3 },
        { value: "two", weight: 3 },
        { value: "three", weight: 5 },
      ],
    });
  });
});
