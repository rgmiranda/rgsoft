import { describe, expect, it } from 'vitest';
import { easeInOutElastic, easeInElastic, easeOutElastic } from '../src';
describe(easeInElastic.name, () => {

  const testData: [number, number][] = [
    // -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4)
    [0, 0],
    [1 / 4, -0.005524271728019902],
    [1 / 3, 0.001709242143112897],
    [1 / 2, -0.015625000000000045],
    [2 / 3, 0.07600123467884114],
    [3 / 4, 0.08838834764831831],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInElastic(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeOutElastic.name, () => {

  const c1 = 1.70158;
  const c3 = c1 + 1;

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 0.9116116523516816],
    [1 / 3, 0.9239987653211588],
    [1 / 2, 1.015625],
    [2 / 3, 0.998290757856887],
    [3 / 4, 1.00552427172802],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeOutElastic(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});

describe(easeInOutElastic.name, () => {

  const c1 = 1.70158;
  const c2 = c1 * 1.525;

  const testData: [number, number][] = [
    [0, 0],
    [1 / 4, 0.011969444423734044],
    [1 / 3, -0.002884348830593738],
    [1 / 2, 1 / 2],
    [2 / 3, 1.0028843488305939],
    [3 / 4, 0.988030555576266],
    [1, 1],
  ];

  it.each(testData)('should return correct value for input %d', (input, expected) => {
    const result = easeInOutElastic(input);
    expect(result).toBeCloseTo(expected, 5);
  });
});
