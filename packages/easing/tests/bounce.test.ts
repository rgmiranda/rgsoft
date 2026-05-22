import { describe, expect, it } from 'vitest';
import { easeInOutBounce, easeInBounce, easeOutBounce } from '../src';
describe(easeInBounce.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 0.02734375],
    [1 / 3, 0.13888888888888873],
    [1 / 2, 0.234375],
    [2 / 3, 0.159722222222222],
    [3 / 4, 0.52734375],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInBounce(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeOutBounce.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 0.47265625],
    [1 / 3, 0.8402777777777777],
    [1 / 2, 0.765625],
    [2 / 3, 0.8611111111111112],
    [3 / 4, 0.97265625],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeOutBounce(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeInOutBounce.name, () => {

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 0.1171875],
    [1 / 3, 0.079861111111111052],
    [1 / 2, 1 / 2],
    [2 / 3, 0.9201388888888886],
    [3 / 4, 0.8828125],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInOutBounce(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});
