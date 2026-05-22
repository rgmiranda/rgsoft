import { describe, expect, it } from 'vitest';
import { easeInOutBack, easeInBack, easeOutBack } from '../src';
describe(easeInBack.name, () => {

  const c1 = 1.70158;
  const c3 = c1 + 1;

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, c3 / 64 - c1 / 16],
    [1 / 3, c3 / 27 - c1 / 9],
    [1 / 2, c3 / 8 - c1 / 4],
    [2 / 3, (c3 * 8) / 27 - (c1 * 4) / 9],
    [3 / 4, (c3 * 27) / 64 - (c1 * 9) / 16],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInBack(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeOutBack.name, () => {

  const c1 = 1.70158;
  const c3 = c1 + 1;

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 1 + c3 * -27 / 64 + c1 * 9 / 16],
    [1 / 3, 1 + c3 * -8 / 27 + c1 * 4 / 9],
    [1 / 2, 1 + c3 * -1 / 8 + c1 * 1 / 4],
    [2 / 3, 1 + c3 * -1 / 27 + c1 * 1 / 9],
    [3 / 4, 1 + c3 * -1 / 64 + c1 * 1 / 16],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeOutBack(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeInOutBack.name, () => {

  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  const testData: [number, number][] = [
    // (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
    [0, 0],
    [1 / 4, ((1 / 4) * ((c2 + 1) * (1 / 2) - c2)) / 2],
    [1 / 3, ((4 / 9) * ((c2 + 1) * (2 / 3) - c2)) / 2],
    [1 / 2, 1 / 2],
    [2 / 3, ((4 / 9) * ((c2 + 1) * (-2 / 3) + c2) + 2) / 2],
    [3 / 4, ((1 / 4) * ((c2 + 1) * (-1 / 2) + c2) + 2) / 2],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInOutBack(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});
