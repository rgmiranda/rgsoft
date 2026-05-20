import { describe, expect, it } from 'vitest';
import { easeInOutCirc, easeInCirc, easeOutCirc } from '../src';
describe(easeInCirc.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 1 - Math.sqrt(15) / 4],
    [1 / 3, 1 - Math.sqrt(8) / 3],
    [1 / 2, 1 - Math.sqrt(3) / 2],
    [2 / 3, 1 - Math.sqrt(5) / 3],
    [3 / 4, 1 - Math.sqrt(7) / 4],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInCirc(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeOutCirc.name, () => {
  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, Math.sqrt(7) / 4],
    [1 / 3, Math.sqrt(5) / 3],
    [1 / 2, Math.sqrt(3) / 2],
    [2 / 3, Math.sqrt(8) / 3],
    [3 / 4, Math.sqrt(15) / 4],
    [1, 1],
  ];

  it.each(testData)(
    "should return correct value for input %d",
    (input, expected) => {
      const result = easeOutCirc(input);
      expect(result).toBeCloseTo(expected, 5);
    },
  );
});

describe(easeInOutCirc.name, () => {
  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, (1 - Math.sqrt(3) / 2) / 2],
    [1 / 3, (1 - Math.sqrt(5) / 3) / 2],
    [1 / 2, 1 / 2],
    [2 / 3, 1 - (1 - Math.sqrt(5) / 3) / 2],
    [3 / 4, 1 - (1 - Math.sqrt(3) / 2) / 2],
    [1, 1],
  ];

  it.each(testData)(
    "should return correct value for input %d",
    (input, expected) => {
      const result = easeInOutCirc(input);
      expect(result).toBeCloseTo(expected, 5);
    },
  );
});
