import { describe, expect, it } from "vitest";
import { Poisson } from "../../src";

describe(Poisson.name, () => {
  const poissonData = [
    { l: 2, x: 0, expected: 0.1353 },
    { l: 2, x: 1, expected: 0.2707 },
    { l: 2, x: 2, expected: 0.2707 },
    { l: 2, x: 3, expected: 0.1804 },
    { l: 2, x: 4, expected: 0.0902 },
    { l: 5, x: 4, expected: 0.1755 },
  ];

  it.each(poissonData)("calculates the probability", ({ l, x, expected }) => {
    const pmf = new Poisson(l);
    const result = pmf.probability(x);
    expect(result).toBeCloseTo(expected, 3);
  });

  it("retrieves a value", () => {
    const pmf = new Poisson(2);
    const result = pmf.sample();
    expect(result).toBeGreaterThanOrEqual(0);
  });

  it("gets the accumulated", () => {
    const pmf = new Poisson(2);
    expect(pmf.getAccumulated(-1)).toBe(0);
    expect(pmf.getAccumulated(10)).toBeCloseTo(1, 2);
    expect(pmf.getAccumulated(10.123)).toBeCloseTo(1, 2);
  });

  it("retrieves the mean", () => {
    const pmf = new Poisson(4);
    expect(pmf.getMean()).toBe(4);
  });

  it("retrieves the variance", () => {
    const pmf = new Poisson(4);
    expect(pmf.getVariance()).toBe(4);
  });

  it("retrieves the standard deviation", () => {
    const pmf = new Poisson(9);
    expect(pmf.getStdDev()).toBe(3);
  });

  it("fails on invalid experiments number", () => {
    expect(() => new Poisson(-9)).toThrowError();
    expect(() => new Poisson(9.5)).toThrowError();
  });

  it("fails on invalid value", () => {
    const pmf = new Poisson(9);
    expect(() => pmf.probability(1.1)).toThrowError();
    expect(() => pmf.probability(-1)).toThrowError();
  });
  
  it("fails when receiving NaN in accumulated", () => {
    const pmf = new Poisson(2);
    expect(() => pmf.getAccumulated(NaN)).toThrowError();
  });
});
