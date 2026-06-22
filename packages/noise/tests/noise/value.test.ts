import { describe, expect, it } from "vitest";
import { ValueNoise, WhiteNoise } from "../../src";

describe(ValueNoise.name, () => {
  const noise = new ValueNoise("test-seed");
  const white = new WhiteNoise("test-seed");

  describe("noise1", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = noise.noise1(0.5);
      const value2 = noise.noise1(0.5);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new ValueNoise("test-seed");
      const value1 = noise.noise1(0.5);
      const value2 = perlin1.noise1(0.5);
      expect(value1).toBe(value2);
    });

    it("should generate white noise values on integers", () => {
      const value1 = noise.noise1(0);
      const value2 = noise.noise1(1);
      const value3 = noise.noise1(10);
      expect(value1).toBe(white.noise1(0));
      expect(value2).toBe(white.noise1(1));
      expect(value3).toBe(white.noise1(10));
    });
  });

  describe("noise2", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = noise.noise2(0.5, 0.75);
      const value2 = noise.noise2(0.5, 0.75);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new ValueNoise("test-seed");
      const value1 = noise.noise2(0.5, 0.977);
      const value2 = perlin1.noise2(0.5, 0.977);
      expect(value1).toBe(value2);
    });

    it("should generate zero values on integers", () => {
      const value1 = noise.noise2(0, 0);
      const value2 = noise.noise2(1, 1);
      const value3 = noise.noise2(10, 20);
      expect(value1).toBe(white.noise2(0, 0));
      expect(value2).toBe(white.noise2(1, 1));
      expect(value3).toBe(white.noise2(10, 20));
    });
  });

  describe("noise3", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = noise.noise3(0.5, 0.75, 0.25);
      const value2 = noise.noise3(0.5, 0.75, 0.25);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new ValueNoise("test-seed");
      const value1 = noise.noise3(0.5, 0.977, 1.6);
      const value2 = perlin1.noise3(0.5, 0.977, 1.6);
      expect(value1).toBe(value2);
    });

    it("should generate zero values on integers", () => {
      const value1 = noise.noise3(0, 0, 0);
      const value2 = noise.noise3(1, 1, 1);
      const value3 = noise.noise3(10, 20, 30);
      expect(value1).toBe(white.noise3(0, 0, 0));
      expect(value2).toBe(white.noise3(1, 1, 1));
      expect(value3).toBe(white.noise3(10, 20, 30));
    });
  });
});
