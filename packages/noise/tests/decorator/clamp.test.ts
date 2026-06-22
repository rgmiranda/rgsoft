import { describe, expect, it } from "vitest";
import { Clamp } from "../../src";
import { sourceMock } from "./source.mock";

const min = 0.25, max = 0.5;

describe(Clamp.name, () => {
  const noise = new Clamp(sourceMock, [min, max]);

  const testData: [number, number, number][] = [
    [0.45, -0.0067, 74.0015],
    [0.89, 8.7001, 15],
    [-78.8, 4.001, 3.012],
    [1025.4, -0.002, 0.1],
  ];

  it.each(testData)('applies the decorator', (x, y, z) => {
    const v1 = noise.noise1(x);
    expect(v1).toBeGreaterThanOrEqual(min);
    expect(v1).toBeLessThanOrEqual(max);
    const v2 = noise.noise2(x, y);
    expect(v2).toBeGreaterThanOrEqual(min);
    expect(v2).toBeLessThanOrEqual(max);
    const v3 = noise.noise3(x, y, z);
    expect(v3).toBeGreaterThanOrEqual(min);
    expect(v3).toBeLessThanOrEqual(max);
  });

  it('fails on invalid range', () => {
    expect(() => new Clamp(sourceMock, [1, 0])).toThrowError(
      "Min cannot be greater than max in range",
    );
  });

});
