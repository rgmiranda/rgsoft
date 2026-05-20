import { describe, expect, it } from 'vitest';
import { easeInOutSine, easeInSine, easeOutSine } from '../src';
describe(easeInSine.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [0.25, 0.07612046748871326],
    [1 / 3, 1 - Math.sqrt(3) / 2],
    [0.5, 1 - Math.SQRT1_2],
    [2 / 3, 0.5],
    [0.75, 0.6173165676349102],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInSine(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeOutSine.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [0.25, 0.3826834323650898],
    [1 / 3, 0.5],
    [0.5, Math.SQRT1_2],
    [2 / 3, Math.sqrt(3) / 2],
    [0.75, 0.9238795325112867],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeOutSine(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeInOutSine.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [0.25, 0.1464466094067262],
    [1 / 3, 0.25],
    [0.5, 0.5],
    [2 / 3, 0.75],
    [0.75, 0.8535533905932737],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInOutSine(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});
