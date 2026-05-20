import { describe, expect, it } from 'vitest';
import { easeInOutQuint, easeInQuint, easeOutQuint } from '../src';
describe(easeInQuint.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 1 / 1024],
    [1 / 3, 1 / 243],
    [0.5, 1 / 32],
    [2 / 3, 32 / 243],
    [3 / 4, 243 / 1024],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInQuint(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeOutQuint.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 781 / 1024],
    [1 / 3, 211 / 243],
    [0.5, 31 / 32],
    [2 / 3, 242 / 243],
    [3 / 4, 1023 / 1024],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeOutQuint(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeInOutQuint.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 1 / 64],
    [1 / 3, 16 / 243],
    [1 / 2, 1 / 2],
    [2 / 3, 227 / 243],
    [3 / 4, 63 / 64],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInOutQuint(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});
