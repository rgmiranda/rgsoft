import { describe, expect, it } from "vitest";
import { Simplex, Tileable } from "../../src";

describe(Tileable.name, () => {
  const source = new Simplex("test-seed");
  const tileable = new Tileable(source);

  it("should expose the wrapped source range", () => {
    expect(tileable.range).toBe(source.range);
  });

  describe("noise1", () => {
    it("should delegate to the wrapped source with trigonometric coordinates", () => {
      const x = 0.75;
      const expected = source.noise2(Math.cos(x), Math.sin(x));

      expect(tileable.noise1(x)).toBe(expected);
    });
  });

  describe("noise2", () => {
    it("should delegate to the wrapped source with trigonometric coordinates", () => {
      const x = 0.75;
      const y = -1.25;
      const expected = source.noise4(
        Math.cos(x),
        Math.sin(x),
        Math.cos(y),
        Math.sin(y),
      );

      expect(tileable.noise2(x, y)).toBe(expected);
    });
  });

  describe("noise3", () => {
    it("should throw for unsupported 3D calls", () => {
      expect(() => tileable.noise3(0, 0, 0)).toThrowError("Method not supported.");
    });
  });

  describe("noise4", () => {
    it("should throw for unsupported 4D calls", () => {
      expect(() => tileable.noise4(0, 0, 0, 0)).toThrowError("Method not supported.");
    });
  });
});
