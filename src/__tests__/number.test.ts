import { randomNumber } from "../number";

describe("simple random number", () => {
  test(`btwn 10 and 1000 to be in range`, () => {
    const value = randomNumber(10, 1000);
    expect(value).toBeGreaterThanOrEqual(10);
    expect(value).toBeLessThanOrEqual(1000);
  });
  test(`btwn -1000 and -10 to be in range`, () => {
    const value = randomNumber(-1000, -10);
    expect(value).toBeGreaterThanOrEqual(-1000);
    expect(value).toBeLessThanOrEqual(-10);
  });
  test("btwn 1 and 1 to return 1", () => {
    const value = randomNumber(1, 1);
    expect(value).toBe(1);
  });
  test("btwn -1 and -1 to be -1", () => {
    const value = randomNumber(-1, -1);
    expect(value).toBe(-1);
  });
  test("btwn -10 and 100 to be in range", () => {
    const value = randomNumber(-10, 100);
    expect(value).toBeGreaterThanOrEqual(-10);
    expect(value).toBeLessThanOrEqual(100);
  });
  test("btwn 100 and 5 to be in range", () => {
    const value = randomNumber(100, 5);
    expect(value).toBeGreaterThanOrEqual(5);
    expect(value).toBeLessThanOrEqual(100);
  });
  test("btwn 10.5 and -100.3452 to be in range", () => {
    const value = randomNumber(10.5, -100.3452);
    expect(value).toBeGreaterThanOrEqual(-100.3452);
    expect(value).toBeLessThanOrEqual(10.5);
  });
});

describe("random number with exclusion", () => {
  test("exclusion of single number", () => {
    const value = randomNumber(1, 2, 1);
    expect(value).toBe(2);
  });
  test("exclusion with empty array", () => {
    const value = randomNumber(1, 10, []);
    expect(value).toBeLessThanOrEqual(10);
    expect(value).toBeGreaterThanOrEqual(1);
  });
  test("exclusion with array of numbers", () => {
    const value = randomNumber(1, 4, [1, 2, 4]);
    expect(value).toBe(3);
  });
  test("exclusion with range", () => {
    const value = randomNumber(1, 10, { rangeStart: 1, rangeEnd: 9 });
    expect(value).toBe(10);
  });
  test("exclusion with array of ranges", () => {
    const value = randomNumber(1, 10, [
      { rangeStart: 1, rangeEnd: 3 },
      { rangeStart: 5, rangeEnd: 10 },
    ]);
    expect(value).toBe(4);
  });
  test("exclusion with array of overlapping ranges", () => {
    const value = randomNumber(1, 10, [
      { rangeStart: 1, rangeEnd: 3 },
      { rangeStart: 1, rangeEnd: 9 },
    ]);
    expect(value).toBe(10);
  });
  test("exclusion with array of ranges excluding all possibilities", () => {
    expect(() => {
      randomNumber(1, 10, [
        { rangeStart: -1, rangeEnd: 3 },
        { rangeStart: 2, rangeEnd: 18 },
      ]);
    }).toThrow(new Error("Invalid range"));
  });
  test("exclusion with number excluding all possibilities ", () => {
    expect(() => {
      randomNumber(1, 1, 1);
    }).toThrow(new Error("Invalid range"));
  });
  test("exclusion with array of numbers excluding all possibilities ", () => {
    expect(() => {
      randomNumber(1, 3, [1, 2, 3]);
    }).toThrow(new Error("Invalid range"));
  });
  test("exclusion with range excluding all possibilities ", () => {
    expect(() => {
      randomNumber(1, 3, { rangeStart: 0, rangeEnd: 8 });
    }).toThrow(new Error("Invalid range"));
  });
});
