import { describe, expect, it } from "vitest";
import { Perlin2 } from '../src';

describe(Perlin2.name, () => {
  const perlin = new Perlin2("test-seed");

  it('should generate consistent noise values for the same input', () => {
    const value1 = perlin.noise(0.5, 0.75);
    const value2 = perlin.noise(0.5, 0.75);
    expect(value1).toBe(value2);
  });

  it('should generate consistent noise values for the same seed', () => {
    const perlin1 = new Perlin2("test-seed");
    const value1 = perlin.noise(0.5, 0.977);
    const value2 = perlin1.noise(0.5, 0.977);
    expect(value1).toBe(value2);
  });

  it('should generate zero values on integers', () => {
    const value1 = perlin.noise(0, 0);
    const value2 = perlin.noise(1, 1);
    const value3 = perlin.noise(10, 20, 0.1, 1);
    expect(value1).toBeCloseTo(0);
    expect(value2).toBeCloseTo(0);
    expect(value3).toBeCloseTo(0);
  });
});
