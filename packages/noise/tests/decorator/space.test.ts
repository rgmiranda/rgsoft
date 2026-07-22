import { describe, expect, it } from "vitest";
import { Space, WhiteNoise } from "../../src";

describe(Space.name, () => {
  const spacing = 0.5;
  const source = new WhiteNoise("123456");
  const noise = new Space(source, spacing);

  const testData: [number, number, number, number][] = [
    [0.45, -0.0067, 74.0015, -0.25],
    [0.89, 8.7001, 15, 7.25],
    [-78.8, 4.001, 3.012, -12.455],
    [1025.4, -0.002, 0.1, 90.921],
  ];

  it("does not update the range", () => {
    expect(source.range).toEqual([-1, 1]);
    expect(noise.range).toEqual([-1, 1]);
  });

  it.each(testData)("applies the decorator", (x, y, z, w) => {
    expect(noise.noise1(x)).toBe(source.noise1(spacing * x));
    expect(noise.noise2(x, y)).toBe(source.noise2(spacing * x, spacing * y));
    expect(noise.noise3(x, y, z)).toBe(
      source.noise3(spacing * x, spacing * y, spacing * z),
    );
    expect(noise.noise4(x, y, z, w)).toBe(
      source.noise4(spacing * x, spacing * y, spacing * z, spacing * w),
    );
  });
});
