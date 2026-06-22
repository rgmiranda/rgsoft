import { describe, expect, it } from "vitest";
import { Invert, WhiteNoise } from "../../src";

describe(Invert.name, () => {

  const source = new WhiteNoise("123456");
  const noise = new Invert(source);

  const testData: [number, number, number][] = [
    [0.45, -0.0067, 74.0015],
    [0.89, 8.7001, 15],
    [-78.8, 4.001, 3.012],
    [1025.4, -0.002, 0.1],
  ];

  it.each(testData)('applies the decorator', (x, y, z) => {
    expect(noise.noise1(x)).toEqual(-1 * source.noise1(x));
    expect(noise.noise2(x, y)).toEqual(-1 * source.noise2(x, y));
    expect(noise.noise3(x, y ,z)).toEqual(-1 * source.noise3(x, y, z));
  });

});
