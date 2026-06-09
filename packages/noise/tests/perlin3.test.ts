import { describe, expect, it } from "vitest";
import { Perlin3 } from '../src';

describe(Perlin3.name, () => {
  const perlin = new Perlin3("test-seed");

  it('should generate consistent noise values for the same input', () => {
    const value1 = perlin.noise(0.5, 0.75, 0.25);
    const value2 = perlin.noise(0.5, 0.75, 0.25);
    expect(value1).toBe(value2);
  });

  it('should generate consistent noise values for the same seed', () => {
    const perlin1 = new Perlin3("test-seed");
    const value1 = perlin.noise(0.5, 0.977, 1.6);
    const value2 = perlin1.noise(0.5, 0.977, 1.6);
    expect(value1).toBe(value2);
  });

  it('should generate zero values on integers', () => {
    const value1 = perlin.noise(0, 0, 0);
    const value2 = perlin.noise(1, 1, 1);
    const value3 = perlin.noise(10, 20, 30, 0.1, 1);
    expect(value1).toBeCloseTo(0);
    expect(value2).toBeCloseTo(0);
    expect(value3).toBeCloseTo(0);
  });
});
