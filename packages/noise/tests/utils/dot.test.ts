import { describe, expect, it } from "vitest";
import { dot } from '../../src/utils';

describe(dot.name, () => {
  const testData: [number[], number[], number][] = [
    [[1, 2], [3, 4], 11],
    [[0, 0], [0, 0], 0],
    [[-1, -2], [-3, -4], 11],
    [[1, 0], [0, 1], 0],
    [[1, 2, 3], [4, 5, 6], 32],
  ];

  it.each(testData)("should calculate the dot product of %o and %o", (a, b, expected) => {
    expect(dot(a, b)).toBe(expected);
  });

  it('throws an error if the inputs are not arrays', () => {
    expect(() => dot(null as any, [1, 2])).toThrow("Both arguments must be arrays");
    expect(() => dot([1, 2], null as any)).toThrow("Both arguments must be arrays");
  });

  it('throws an error if the input arrays have different lengths', () => {
    expect(() => dot([1, 2], [1])).toThrow("Vectors must be of the same length");
    expect(() => dot([1], [1, 2])).toThrow("Vectors must be of the same length");
  });
});
