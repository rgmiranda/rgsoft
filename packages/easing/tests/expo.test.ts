import { describe, expect, it } from 'vitest';
import { easeInOutExpo, easeInExpo, easeOutExpo } from '../src';
describe(easeInExpo.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, Math.pow(2, -15 / 2)],
    [1 / 3, Math.pow(2, -20 / 3)],
    [0.5, 1 / 32],
    [2 / 3, Math.pow(2, -10 / 3)],
    [3 / 4, Math.pow(2, -10 / 4)],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInExpo(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeOutExpo.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 1 - Math.pow(2, -10 / 4)],
    [1 / 3, 1 - Math.pow(2, -10 / 3)],
    [0.5, 31 / 32],
    [2 / 3, 1 - Math.pow(2, -20 / 3)],
    [3 / 4, 1 - Math.pow(2, -30 / 4)],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeOutExpo(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeInOutExpo.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 1 / 64],
    [1 / 3, Math.pow(2, -10 / 3) / 2],
    [1 / 2, 1 / 2],
    [2 / 3, 1 - Math.pow(2, -10 / 3) / 2],
    [3 / 4, 63 / 64],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInOutExpo(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});
