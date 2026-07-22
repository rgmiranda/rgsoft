import { describe, expect, it } from "vitest";
import { Perlin } from "../../src";

describe(Perlin.name, () => {
  const perlin = new Perlin("test-seed");

  describe("noise1", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = perlin.noise1(0.5);
      const value2 = perlin.noise1(0.5);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new Perlin("test-seed");
      const value1 = perlin.noise1(0.5);
      const value2 = perlin1.noise1(0.5);
      expect(value1).toBe(value2);
    });

    it("should generate zero values on integers", () => {
      const value1 = perlin.noise1(0);
      const value2 = perlin.noise1(1);
      const value3 = perlin.noise1(10);
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
    });
  });

  describe("noise2", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = perlin.noise2(0.5, 0.75);
      const value2 = perlin.noise2(0.5, 0.75);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new Perlin("test-seed");
      const value1 = perlin.noise2(0.5, 0.977);
      const value2 = perlin1.noise2(0.5, 0.977);
      expect(value1).toBe(value2);
    });

    it("should generate zero values on integers", () => {
      const value1 = perlin.noise2(0, 0);
      const value2 = perlin.noise2(1, 1);
      const value3 = perlin.noise2(10, 20);
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
    });
  });

  describe("noise3", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = perlin.noise3(0.5, 0.75, 0.25);
      const value2 = perlin.noise3(0.5, 0.75, 0.25);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new Perlin("test-seed");
      const value1 = perlin.noise3(0.5, 0.977, 1.6);
      const value2 = perlin1.noise3(0.5, 0.977, 1.6);
      expect(value1).toBe(value2);
    });

    it("should generate zero values on integers", () => {
      const value1 = perlin.noise3(0, 0, 0);
      const value2 = perlin.noise3(1, 1, 1);
      const value3 = perlin.noise3(10, 20, 30);
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
    });
  });

  describe("noise4", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = perlin.noise4(0.5, 0.75, 0.25, 0.125);
      const value2 = perlin.noise4(0.5, 0.75, 0.25, 0.125);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new Perlin("test-seed");
      const value1 = perlin.noise4(0.5, 0.977, 1.6, 0.25);
      const value2 = perlin1.noise4(0.5, 0.977, 1.6, 0.25);
      expect(value1).toBe(value2);
    });

    it("should generate zero values on integers", () => {
      const value1 = perlin.noise4(0, 0, 0, 0);
      const value2 = perlin.noise4(1, 1, 1, 1);
      const value3 = perlin.noise4(10, 20, 30, 40);
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
    });
  });
});
