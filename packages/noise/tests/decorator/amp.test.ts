import { describe, expect, it } from "vitest";
import { Amp, Simplex } from "../../src";

describe(Amp.name, () => {

  const amplitude = 2.5;
  const source = new Simplex('123456');
  const noise = new Amp(source, amplitude);

  const testData: [number, number, number][] = [
    [0.45, -0.0067, 74.0015],
    [0.89, 8.7001, 15],
    [-78.8, 4.001, 3.012],
    [1025.4, -0.002, 0.1],
  ];

  it('updates the range', () => {
    expect(source.range).toEqual([-1, 1]);
    expect(noise.range).toEqual([-2.5, 2.5]);
  });

  it.each(testData)('applies the decorator', (x, y, z) => {
    expect(noise.noise1(x)).toBe(amplitude * source.noise1(x));
    expect(noise.noise2(x, y)).toBe(amplitude * source.noise2(x, y));
    expect(noise.noise3(x, y ,z)).toBe(amplitude * source.noise3(x, y ,z));
  });

});
