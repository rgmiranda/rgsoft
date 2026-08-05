import { describe, expect, it } from "vitest";
import { OpenSimplex } from "../../src";

describe(OpenSimplex.name, () => {
  const noise = new OpenSimplex("test-seed");

  it("should generate deterministic values for the same input", () => {
    expect(noise.noise2(0.5, 0.75)).toBe(noise.noise2(0.5, 0.75));
    expect(noise.noise3(0.25, 0.5, 0.75)).toBe(noise.noise3(0.25, 0.5, 0.75));
  });

  it("should generate deterministic values for the same seed", () => {
    const other = new OpenSimplex("test-seed");
    expect(noise.noise2(0.5, 0.75)).toBe(other.noise2(0.5, 0.75));
    expect(noise.noise3(0.25, 0.5, 0.75)).toBe(other.noise3(0.25, 0.5, 0.75));
  });

  it("should produce bounded values", () => {
    const value2 = noise.noise2(0.5, 0.75);
    const value3 = noise.noise3(0.25, 0.5, 0.75);
    const value4 = noise.noise4(0.25, 0.5, 0.75, 0.125);

    expect(value2).toBeGreaterThanOrEqual(-1);
    expect(value2).toBeLessThanOrEqual(1);
    expect(value3).toBeGreaterThanOrEqual(-1);
    expect(value3).toBeLessThanOrEqual(1);
    expect(value4).toBeGreaterThanOrEqual(-1);
    expect(value4).toBeLessThanOrEqual(1);
  });

  it("should return zero on a lattice point", () => {
    expect(noise.noise2(0, 0)).toBeCloseTo(0);
    expect(noise.noise3(0, 0, 0)).toBeCloseTo(0);
    expect(noise.noise4(0, 0, 0, 0)).toBeCloseTo(0);
  });
});
