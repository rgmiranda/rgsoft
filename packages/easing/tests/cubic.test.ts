import { describe, expect, it } from 'vitest';
import { easeInOutCubic, easeInCubic, easeOutCubic } from '../src';
describe(easeInCubic.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [0.25, 1 / 64],
    [1 / 3, 1 / 27],
    [0.5, 0.125],
    [2 / 3, 8 / 27],
    [0.75, 27 / 64],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInCubic(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeOutCubic.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [0.25, 37 / 64],
    [1 / 3, 19 / 27],
    [0.5, 7 / 8],
    [2 / 3, 26 / 27],
    [0.75, 63 / 64],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeOutCubic(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeInOutCubic.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [0.25, 1 / 16],
    [1 / 3, 4 / 27],
    [0.5, 0.5],
    [2 / 3, 23 / 27],
    [0.75, 15 / 16],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInOutCubic(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});
