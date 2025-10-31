import { describe, expect, it } from "vitest";
import { erf } from "../../src";

describe(erf.name, () => {
  const testData: number[][] = [
    [-3, -0.99997],
    [-2, -0.995322],
    [-1, -0.8427],
    [0, 0],
    [1, 0.8427],
    [2, 0.995322],
    [3, 0.99997],
  ];

  it.each(testData)("calculates the error function", (x, expected) => {
    expect(erf(x)).toBeCloseTo(expected, 4);
  });
});
