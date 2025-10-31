import { describe, expect, it } from "vitest";
import { Binomial } from "../../src";

describe(Binomial.name, () => {
  const binomialData = [
    { n: 1, p: 0.5, x: 1, expected: 0.5 },
    { n: 2, p: 0.5, x: 2, expected: 0.25 },
    { n: 3, p: 0.5, x: 0, expected: 0.125 },
    { n: 3, p: 0.5, x: 3, expected: 0.125 },
  ];

  it.each(binomialData)(
    "calculates the probability",
    ({ n, p, x, expected }) => {
      const pmf = new Binomial(n, p);
      const result = pmf.probability(x);
      expect(result).toBe(expected);
    }
  );

  it("retrieves a value", () => {
    const pmf = new Binomial(9, 0.5);
    const result = pmf.sample();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(9);
  });

  it("retrieves the mean", () => {
    const pmf = new Binomial(10, 0.3);
    expect(pmf.getMean()).toBe(3);
  });

  it("retrieves the variance", () => {
    const pmf = new Binomial(100, 0.5);
    expect(pmf.getVariance()).toBe(25);
  });

  it("retrieves the standard deviation", () => {
    const pmf = new Binomial(100, 0.5);
    expect(pmf.getStdDev()).toBe(5);
  });

  it("gets the accumulated", () => {
    const pmf = new Binomial(5, 0.5);
    expect(pmf.getAccumulated(-1)).toBe(0);
    expect(pmf.getAccumulated(5)).toBe(1);
    expect(pmf.getAccumulated(2)).toBe(0.5);
    expect(pmf.getAccumulated(2.9)).toBe(0.5);
    expect(pmf.getAccumulated(5)).toBe(1);
    expect(pmf.getAccumulated(6)).toBe(1);
  });
  
  it("fails when receiving NaN in accumulated", () => {
    const pmf = new Binomial(5, 0.5);
    expect(() => pmf.getAccumulated(NaN)).toThrowError();
  });

  it("fails on invalid success probability", () => {
    expect(() => new Binomial(9, 1.5)).toThrowError();
    expect(() => new Binomial(9, -0.4)).toThrowError();
  });

  it("fails on invalid number of tries", () => {
    expect(() => new Binomial(-9, 0.5)).toThrowError();
    expect(() => new Binomial(9.2, 0.5)).toThrowError();
  });

  it("fails on invalid value", () => {
    const pmf = new Binomial(9, 0.5);
    expect(() => pmf.probability(10)).toThrowError();
    expect(() => pmf.probability(-1)).toThrowError();
  });
});
