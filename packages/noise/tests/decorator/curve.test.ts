import { describe, expect, it } from "vitest";
import { Curve, Simplex } from "../../src";
import { sourceMock } from "./source.mock";

const min = -1, max = 1;

describe(Curve.name, () => {
  const curve = (x: number) => x * x;
  const source = new Simplex();
  const noise = new Curve(sourceMock, curve, [min, max]);

  const testData: [number, number, number][] = [
    [0.45, -0.0067, 74.0015],
    [0.89, 8.7001, 15],
    [-78.8, 4.001, 3.012],
    [1025.4, -0.002, 0.1],
  ];

  it.each(testData)('applies the decorator', (x, y, z) => {
    expect(noise.noise1(x)).toEqual(source.noise1(x) * source.noise1(x));
    expect(noise.noise2(x, y)).toEqual(source.noise2(x, y) * source.noise2(x, y));
    expect(noise.noise3(x, y, z)).toEqual(source.noise3(x, y, z) * source.noise3(x, y, z));
  });

});
