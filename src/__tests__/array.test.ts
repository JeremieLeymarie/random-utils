import { randomInArray } from "../array";

describe("random in array", () => {
  test("simple array", () => {
    const array = [1, 2, 3];
    const randomElement = randomInArray(array);
    expect(array).toContain(randomElement);
  });
  test("empty array", () => {
    const randomElement = randomInArray([]);
    expect(randomElement).toBe(undefined);
  });
  test("array with lots of different types", () => {
    const array = [1, "2", undefined, false, , null, { test: 1 }, []];
    const randomElement = randomInArray(array);
    expect(array).toContain(randomElement);
  });
  test("array with one element", () => {
    const randomElement = randomInArray([1]);
    expect(randomElement).toBe(1);
  });
  test("array with one element", () => {
    const randomElement = randomInArray([1]);
    expect(randomElement).toBe(1);
  });
});

describe("random in array with exclusion", () => {
  test("exclusion of single index", () => {
    const value = randomInArray([1, 2], 1);
    expect(value).toBe(1);
  });
  test("exclusion with empty array", () => {
    const value = randomInArray([1], []);
    expect(value).toBe(1);
  });
  test("exclusion with array of numbers", () => {
    const value = randomInArray([1, 2, 3, 4], [1, 3, 0]);
    expect(value).toBe(3);
  });
  test("exclusion with range", () => {
    const value = randomInArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {
      rangeStart: 0,
      rangeEnd: 8,
    });
    expect(value).toBe(10);
  });
  test("exclusion with array of ranges", () => {
    const value = randomInArray(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [
        { rangeStart: 1, rangeEnd: 4 },
        { rangeStart: 5, rangeEnd: 10 },
      ]
    );
    expect(value).toBe(1);
  });
  test("exclusion with array of overlapping ranges", () => {
    const value = randomInArray(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      [
        { rangeStart: 0, rangeEnd: 4 },
        { rangeStart: 2, rangeEnd: 8 },
      ]
    );
    expect(value).toBe(10);
  });
  test("exclusion with array of ranges excluding all possibilities", () => {
    expect(() => {
      randomInArray(
        [1, 10],
        [
          { rangeStart: -1, rangeEnd: 3 },
          { rangeStart: 2, rangeEnd: 18 },
        ]
      );
    }).toThrow(new Error("Invalid range"));
  });
  test("exclusion with number excluding all possibilities ", () => {
    expect(() => {
      randomInArray([1], 0);
    }).toThrow(new Error("Invalid range"));
  });
  test("exclusion with array of numbers excluding all possibilities ", () => {
    expect(() => {
      randomInArray([1, 3], [0, 1, 2, 3]);
    }).toThrow(new Error("Invalid range"));
  });
  test("exclusion with range excluding all possibilities ", () => {
    expect(() => {
      randomInArray([1, 3], { rangeStart: 0, rangeEnd: 8 });
    }).toThrow(new Error("Invalid range"));
  });
});
