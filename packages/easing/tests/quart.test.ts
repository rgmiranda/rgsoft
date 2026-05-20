import { describe, expect, it } from 'vitest';
import { easeInOutQuart, easeInQuart, easeOutQuart } from '../src';
describe(easeInQuart.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 1 / 256],
    [1 / 3, 1 / 81],
    [0.5, 1 / 16],
    [2 / 3, 16 / 81],
    [3 / 4, 81 / 256],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInQuart(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeOutQuart.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 175 / 256],
    [1 / 3, 65 / 81],
    [0.5, 15 / 16],
    [2 / 3, 80 / 81],
    [3 / 4, 255 / 256],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeOutQuart(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeInOutQuart.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 1 / 32],
    [1 / 3, 8 / 81],
    [0.5, 0.5],
    [2 / 3, 73 / 81],
    [3 / 4, 31 / 32],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInOutQuart(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});
