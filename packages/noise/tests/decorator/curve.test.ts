import { describe, expect, it } from "vitest";
import { Curve } from "../../src";
import { sourceMock } from "./source.mock";

describe(Curve.name, () => {
  const curve = (x: number) => 0.5 * x + 0.5;
  const noise = new Curve(sourceMock, curve);

  const testData: [number, number, number, number][] = [
    [0.45, -0.0067, 74.0015, -0.25],
    [0.89, 8.7001, 15, 7.25],
    [-78.8, 4.001, 3.012, -12.455],
    [1025.4, -0.002, 0.1, 90.921],
  ];

  it("does not update the range", () => {
    expect(sourceMock.range).toEqual([0, 1]);
    expect(noise.range).toEqual([0, 1]);
  });

  it.each(testData)("applies the decorator", (x, y, z, w) => {
    expect(noise.noise1(x)).toBeGreaterThanOrEqual(0);
    expect(noise.noise2(x, y)).toBeGreaterThanOrEqual(0);
    expect(noise.noise3(x, y, z)).toBeGreaterThanOrEqual(0);
    expect(noise.noise4(x, y, z, w)).toBeGreaterThanOrEqual(0);
  });
});
