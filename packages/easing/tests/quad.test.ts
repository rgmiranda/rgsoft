import { describe, expect, it } from 'vitest';
import { easeInOutQuad, easeInQuad, easeOutQuad } from '../src';
describe(easeInQuad.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [0.25, 1 / 16],
    [1 / 3, 1 / 9],
    [0.5, 0.25],
    [2 / 3, 4 / 9],
    [0.75, 9 / 16],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInQuad(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeOutQuad.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [0.25, 7 / 16],
    [1 / 3, 5 / 9],
    [0.5, 0.75],
    [2 / 3, 8 / 9],
    [0.75, 15 / 16],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeOutQuad(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeInOutQuad.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [0.25, 1 / 8],
    [1 / 3, 2 / 9],
    [0.5, 0.5],
    [2 / 3, 7 / 9],
    [0.75, 7 / 8],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInOutQuad(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});
