import { describe, expect, it } from "vitest";
import { Perlin1 } from '../src/perlin1';

describe(Perlin1.name, () => {
  const perlin = new Perlin1("test-seed");

  it('should generate consistent noise values for the same input', () => {
    const value1 = perlin.noise(0.5);
    const value2 = perlin.noise(0.5);
    expect(value1).toBe(value2);
  });

  it('should generate consistent noise values for the same seed', () => {
    const perlin1 = new Perlin1("test-seed");
    const value1 = perlin.noise(0.5);
    const value2 = perlin1.noise(0.5);
    expect(value1).toBe(value2);
  });

  it('should generate zero values on integers', () => {
    const value1 = perlin.noise(0);
    const value2 = perlin.noise(1);
    const value3 = perlin.noise(10, 0.1, 1);
    expect(value1).toBeCloseTo(0);
    expect(value2).toBeCloseTo(0);
    expect(value3).toBeCloseTo(0);
  });
});
