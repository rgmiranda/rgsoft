import { describe, expect, it } from "vitest";
import { WhiteNoise } from "../../src";

describe(WhiteNoise.name, () => {
  const noise = new WhiteNoise("test-seed");

  it("should not collide on ambiguous coordinate tuples", () => {
    const hash1 = (noise as any).hash(1, 23);
    const hash2 = (noise as any).hash(12, 3);

    expect(hash1).not.toBe(hash2);
  });

  it("should not collide when decimal boundaries shift", () => {
    const hash1 = (noise as any).hash(0.1, 23);
    const hash2 = (noise as any).hash(0.12, 3);

    expect(hash1).not.toBe(hash2);
  });

  describe("noise1", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = noise.noise1(0.5);
      const value2 = noise.noise1(0.5);
      const value3 = noise.noise1(0);
      expect(value1).toBe(value2);
      expect(value1).toBe(value3);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new WhiteNoise("test-seed");
      const value1 = noise.noise1(0.5);
      const value2 = perlin1.noise1(0.5);
      expect(value1).toBe(value2);
    });
  });

  describe("noise2", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = noise.noise2(0.5, 0.75);
      const value2 = noise.noise2(0.5, 0.75);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new WhiteNoise("test-seed");
      const value1 = noise.noise2(0.5, 0.977);
      const value2 = perlin1.noise2(0.5, 0.977);
      expect(value1).toBe(value2);
    });
  });

  describe("noise3", () => {
    it("should generate consistent noise values for the same input", () => {
      const value1 = noise.noise3(0.5, 0.75, 0.25);
      const value2 = noise.noise3(0.5, 0.75, 0.25);
      expect(value1).toBe(value2);
    });

    it("should generate consistent noise values for the same seed", () => {
      const perlin1 = new WhiteNoise("test-seed");
      const value1 = noise.noise3(0.5, 0.977, 1.6);
      const value2 = perlin1.noise3(0.5, 0.977, 1.6);
      expect(value1).toBe(value2);
    });
  });

  it("should produce values within the expected range", () => {
    const values = [
      noise.noise1(0.5),
      noise.noise2(0.5, 0.75),
      noise.noise3(0.5, 0.75, 0.25),
    ];

    values.forEach((value) => {
      expect(value).toBeGreaterThanOrEqual(-1);
      expect(value).toBeLessThanOrEqual(1);
    });
  });
});
