import { describe, expect, it } from "vitest";
import { Invert, Offset, WhiteNoise } from "../../src";

describe(Invert.name, () => {
  const source = new Offset(new WhiteNoise(), 0.5);
  const noise = new Invert(source);

  it("updates the range", () => {
    expect(source.range).toEqual([-0.5, 1.5]);
    expect(noise.range).toEqual([-1.5, 0.5]);
  });

  const testData: [number, number, number, number][] = [
    [0.45, -0.0067, 74.0015, -0.25],
    [0.89, 8.7001, 15, 7.25],
    [-78.8, 4.001, 3.012, -12.455],
    [1025.4, -0.002, 0.1, 90.921],
  ];

  it.each(testData)("applies the decorator", (x, y, z, w) => {
    expect(noise.noise1(x)).toEqual(-1 * source.noise1(x));
    expect(noise.noise2(x, y)).toEqual(-1 * source.noise2(x, y));
    expect(noise.noise3(x, y, z)).toEqual(-1 * source.noise3(x, y, z));
    expect(noise.noise4(x, y, z, w)).toEqual(-1 * source.noise4(x, y, z, w));
  });
});
