import { randomBool } from "../boolean";

describe("random bool", () => {
  test("no parameter", () => {
    expect(typeof randomBool() === "boolean").toBeTruthy();
  });
  test("0% truthiness", () => {
    expect(randomBool(0)).toBe(false);
  });
  test("100% truthiness", () => {
    expect(randomBool(100)).toBe(true);
  });
  test("-100% truthiness", () => {
    expect(randomBool(-100)).toBe(false);
  });
  test("200% truthiness", () => {
    expect(randomBool(200)).toBe(true);
  });
});
