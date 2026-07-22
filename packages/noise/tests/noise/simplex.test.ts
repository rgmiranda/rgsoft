import { describe, expect, it } from "vitest";
import { Simplex } from "../../src";

const G2 = (3 - Math.sqrt(3)) / 6;

describe(Simplex.name, () => {
  const simplex = new Simplex("test-seed");

  describe("noise1", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = simplex.noise1(0.5);
      const value2 = simplex.noise1(0.5);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new Simplex("test-seed");
      const value1 = simplex.noise1(0.5);
      const value2 = perlin1.noise1(0.5);
      expect(value1).toBe(value2);
    });

    it("should generate zero values on integers", () => {
      const value1 = simplex.noise1(0);
      const value2 = simplex.noise1(1);
      const value3 = simplex.noise1(10);
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
    });

    it("should generate zero values on lattice points", () => {
      const value1 = simplex.noise1(0);
      const value2 = simplex.noise1(1);
      const value3 = simplex.noise1(2);
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
    });
  });

  describe("noise2", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = simplex.noise2(0.5, 0.75);
      const value2 = simplex.noise2(0.5, 0.75);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new Simplex("test-seed");
      const value1 = simplex.noise2(0.5, 0.977);
      const value2 = perlin1.noise2(0.5, 0.977);
      expect(value1).toBe(value2);
    });

    it("should generate zero values on integers", () => {
      const value1 = simplex.noise2(0, 0);
      const value2 = simplex.noise2(1 - 2 * G2, 1 - 2 * G2);
      const value3 = simplex.noise2(4 - 5 * G2, 1 - 5 * G2);
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
    });

    it("should generate zero values on lattice points", () => {
      const value1 = simplex.noise2(0, 0);
      const value2 = simplex.noise2(1, 1);
      const value3 = simplex.noise2(2, 3);
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
        const a = simplex.noise2(x0, y0);
        const b = simplex.noise2(x1, y1);
        expect(Math.abs(a - b)).toBeLessThan(d);
      },
    );

    it("should produce limited values", () => {
      const value = simplex.noise2(0.5, 0.75);
      expect(value).toBeGreaterThanOrEqual(-1);
      expect(value).toBeLessThanOrEqual(1);
    });
  });

  describe("noise3", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = simplex.noise3(0.5, 0.75, 0.25);
      const value2 = simplex.noise3(0.5, 0.75, 0.25);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new Simplex("test-seed");
      const value1 = simplex.noise3(0.5, 0.977, 1.6);
      const value2 = perlin1.noise3(0.5, 0.977, 1.6);
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
        const a = simplex.noise3(x0, y0, z0);
        const b = simplex.noise3(x1, y1, z1);
        expect(Math.abs(a - b)).toBeLessThan(d);
      },
    );

    it("should produce limited values", () => {
      const value = simplex.noise3(0.5, 0.75, 0.25);
      expect(value).toBeGreaterThanOrEqual(-1);
      expect(value).toBeLessThanOrEqual(1);
    });

    it("should generate zero values on lattice points", () => {
      const value1 = simplex.noise3(0, 0, 0);
      const value2 = simplex.noise3(1, 1, 1);
      const value3 = simplex.noise3(2, 3, 4);
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
    });
  });

  describe("noise4", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = simplex.noise4(0.5, 0.75, 0.25, 0.125);
      const value2 = simplex.noise4(0.5, 0.75, 0.25, 0.125);
      expect(value1).toBe(value2);
    });

    it("should generate zero values on lattice points", () => {
      const value1 = simplex.noise4(0, 0, 0, 0);
      const value2 = simplex.noise4(
        0.8618033988749895,
        -0.1381966011250105,
        -0.1381966011250105,
        -0.1381966011250105,
      );
      const value3 = simplex.noise4(
        0.723606797749979,
        0.723606797749979,
        -0.276393202250021,
        -0.276393202250021,
      );
      const value4 = simplex.noise4(
        0.447213595499958,
        0.447213595499958,
        0.447213595499958,
        0.447213595499958,
      );
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
      expect(value4).toBeCloseTo(0);
    });
  });
});
