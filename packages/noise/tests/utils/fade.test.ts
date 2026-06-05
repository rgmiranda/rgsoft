import { describe, expect, it } from "vitest";
import { fade } from '../../src/utils/fade';

describe(fade.name, () => {
  const testData: [number, number][] = [
    [0, 0],
    [0.25, 0.103515625],
    [0.5, 0.5],
    [0.75, 0.896484375],
    [1, 1],
  ];

  it.each(testData)('should return the input value for 0 and 1', (input, expected) => {
    expect(fade(input)).toBeCloseTo(expected);
  });
});
