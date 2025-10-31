import { describe, expect, it } from "vitest";
import { NegativeBinomial } from "../../src";

describe(NegativeBinomial.name, () => {
  const binomialData = [
    { r: 1, p: 0.5, x: 0, expected: 0.5 },
    { r: 1, p: 0.5, x: 1, expected: 0.25 },
    { r: 1, p: 0.5, x: 2, expected: 0.125 },
    { r: 2, p: 0.5, x: 0, expected: 0.25 },
    { r: 2, p: 0.5, x: 1, expected: 0.25 },
  ];

  it.each(binomialData)(
    "calculates the probability",
    ({ r, p, x, expected }) => {
      const pmf = new NegativeBinomial(r, p);
      const result = pmf.probability(x);
      expect(result).toBe(expected);
    }
  );

  it("retrieves a value", () => {
    const pmf = new NegativeBinomial(2, 0.5);
    const result = pmf.sample();
    expect(result).toBeGreaterThanOrEqual(0);
  });
  
  it("retrieves the mean", () => {
    const pmf = new NegativeBinomial(2, 0.4);
    expect(pmf.getMean()).toBeCloseTo(3, 6);
  });

  it("retrieves the variance", () => {
    const pmf = new NegativeBinomial(1, 0.5);
    expect(pmf.getVariance()).toBe(2);
  });

  it("retrieves the standard deviation", () => {
    const pmf = new NegativeBinomial(2, 0.5);
    expect(pmf.getStdDev()).toBe(2);
  });

  it("gets the accumulated", () => {
    const pmf = new NegativeBinomial(2, 0.5);
    expect(pmf.getAccumulated(-1)).toBe(0);
    expect(pmf.getAccumulated(10)).toBeCloseTo(1, 2);
    expect(pmf.getAccumulated(10.9)).toBeCloseTo(1, 2);
    expect(pmf.getAccumulated(1)).toBe(0.5);
  });

  it("fails when receiving NaN in accumulated", () => {
    const pmf = new NegativeBinomial(2, 0.5);
    expect(() => pmf.getAccumulated(NaN)).toThrowError();
  });

  it("fails on invalid experiments number", () => {
    expect(() => new NegativeBinomial(-9, 1)).toThrowError();
    expect(() => new NegativeBinomial(9.5, 1)).toThrowError();
  });

  it("fails on invalid success probaility", () => {
    expect(() => new NegativeBinomial(9, 1.5)).toThrowError();
    expect(() => new NegativeBinomial(9, -0.4)).toThrowError();
  });

  it("fails on invalid value", () => {
    const pmf = new NegativeBinomial(9, 0.5);
    expect(() => pmf.probability(1.1)).toThrowError();
    expect(() => pmf.probability(-1)).toThrowError();
  });
});
