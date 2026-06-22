import { describe, expect, it } from "vitest";
import { Simplex, FBM } from "../../src";
import { sourceMock } from "../decorator/source.mock";

const G2 = (3 - Math.sqrt(3)) / 6;

describe(FBM.name, () => {
  const noise = new FBM(new Simplex("test-seed"), 4, 2, 0.5);

  it('fails on invalid octaves number', () => {
    expect(() => new FBM(sourceMock, 0, 2, 0.5)).toThrowError(
      "Octaves must be greater than or equal to 1",
    );
  });

  describe("noise1", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = noise.noise1(0.5);
      const value2 = noise.noise1(0.5);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const noise2 = new FBM(new Simplex("test-seed"), 4, 2, 0.5);
      const value1 = noise.noise1(0.5);
      const value2 = noise2.noise1(0.5);
      expect(value1).toBe(value2);
    });

    it("should generate zero values on integers", () => {
      const value1 = noise.noise1(0);
      const value2 = noise.noise1(1);
      const value3 = noise.noise1(10);
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
    });
  });

  describe("noise2", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = noise.noise2(0.5, 0.75);
      const value2 = noise.noise2(0.5, 0.75);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const noise2 = new FBM(new Simplex("test-seed"), 4, 2, 0.5);
      const value1 = noise.noise2(0.5, 0.977);
      const value2 = noise2.noise2(0.5, 0.977);
      expect(value1).toBe(value2);
    });

    it("should generate zero values on integers", () => {
      const value1 = noise.noise2(0, 0);
      const value2 = noise.noise2(1 - 2 * G2, 1 - 2 * G2);
      const value3 = noise.noise2(4 - 5 * G2, 1 - 5 * G2);
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
    });

    const cotinuousValuesData: number[][] = [
      [1, 2, 1.0001, 2, 0.01],
      [2, 2, 1, 2.0001, 3, 0.01],
      [1 - 2 * G2, 1 - 2 * G2, 1.0001 - 2 * G2, 1 - 2 * G2, 3, 0.01],
      [1 - 2 * G2, 1 - 2 * G2, 11 - 2 * G2, 0.9999 - 2 * G2, 3, 0.01],
    ];

    it.each(cotinuousValuesData)(
      "should produce cotinuous values",
      (x0, y0, x1, y1, d) => {
        const a = noise.noise2(x0, y0);
        const b = noise.noise2(x1, y1);
        expect(Math.abs(a - b)).toBeLessThan(d);
      },
    );

    it("should produce limited values", () => {
      const value = noise.noise2(0.5, 0.75);
      expect(value).toBeGreaterThanOrEqual(-1);
      expect(value).toBeLessThanOrEqual(1);
    });
  });

  describe("noise3", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = noise.noise3(0.5, 0.75, 0.25);
      const value2 = noise.noise3(0.5, 0.75, 0.25);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const noise2 = new FBM(new Simplex("test-seed"), 4, 2, 0.5);
      const value1 = noise.noise3(0.5, 0.977, 1.6);
      const value2 = noise2.noise3(0.5, 0.977, 1.6);
      expect(value1).toBe(value2);
    });

    const cotinuousValuesData: number[][] = [
      [1, 2, 3, 1.0001, 2, 3, 0.01],
      [2, 2, 3, 2, 2.0001, 3, 0.01],
      [-5, 2, 0, -5, 2, 0.0001, 0.01],
    ];

    it.each(cotinuousValuesData)(
      "should produce cotinuous values",
      (x0, y0, z0, x1, y1, z1, d) => {
        const a = noise.noise3(x0, y0, z0);
        const b = noise.noise3(x1, y1, z1);
        expect(Math.abs(a - b)).toBeLessThan(d);
      },
    );

    it("should produce limited values", () => {
      const value = noise.noise3(0.5, 0.75, 0.25);
      expect(value).toBeGreaterThanOrEqual(-1);
      expect(value).toBeLessThanOrEqual(1);
    });
  });
});
