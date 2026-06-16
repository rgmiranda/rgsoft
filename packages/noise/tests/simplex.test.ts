import { describe, expect, it } from "vitest";
import { Simplex } from "../src";

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

    it("should generate zero values on integers", () => {
      const value1 = simplex.noise3(0, 0, 0);
      const value2 = simplex.noise3(1, 1, 1);
      const value3 = simplex.noise3(10, 20, 30);
      expect(value1).toBeCloseTo(0);
      expect(value2).toBeCloseTo(0);
      expect(value3).toBeCloseTo(0);
    });
  });
});
