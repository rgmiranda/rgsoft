import { describe, expect, it } from "vitest";
import { Space, Simplex } from "../../src";

describe(Space.name, () => {

  const spacing = 0.5;
  const source = new Simplex('123456');
  const noise = new Space(source, spacing);

  const testData: [number, number, number][] = [
    [0.45, -0.0067, 74.0015],
    [0.89, 8.7001, 15],
    [-78.8, 4.001, 3.012],
    [1025.4, -0.002, 0.1],
  ];

  it('does not update the range', () => {
    expect(source.range).toEqual([-1, 1]);
    expect(noise.range).toEqual([-1, 1]);
  });

  it.each(testData)('applies the decorator', (x, y, z) => {
    expect(noise.noise1(x)).toBe(source.noise1(spacing * x));
    expect(noise.noise2(x, y)).toBe(source.noise2(spacing * x, spacing * y));
    expect(noise.noise3(x, y ,z)).toBe(source.noise3(spacing * x, spacing * y ,spacing * z));
  });

});
