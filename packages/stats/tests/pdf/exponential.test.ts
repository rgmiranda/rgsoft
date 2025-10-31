import { beforeAll, describe, expect, it } from "vitest";
import { Exponential } from "../../src";

describe(Exponential.name, () => {
  let pdf: Exponential;
  const m = 2;

  beforeAll(() => {
    pdf = new Exponential(m);
  });

  it("gets values", () => {
    const values = Array(10)
      .fill(false)
      .map(() => pdf.sample());
    values.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(0);
    });
  });

  it("gets the mean", () => {
    const result = pdf.getMean();
    expect(result).toBe(m);
  });

  it("gets the variance", () => {
    const result = pdf.getVariance();
    expect(result).toBe(m ** 2);
  });

  it("gets the standard deviation", () => {
    const result = pdf.getStdDev();
    expect(result).toBe(m);
  });

  it("gets the density", () => {
    expect(pdf.density(0)).toBe(1 / m);
    expect(pdf.density(-1)).toBe(0);
  });

  it("gets the accumulated", () => {
    expect(pdf.getAccumulated(-10)).toBe(0);
    expect(pdf.getAccumulated(0)).toBe(0);
    expect(pdf.getAccumulated(m)).toBeCloseTo(1 - 1 / Math.E, 5);
    expect(pdf.getAccumulated(m * Math.log(2))).toBeCloseTo(0.5, 5);
  });
  
  it('fails on invalid mean', () => {
    expect(() => new Exponential(-1)).toThrowError(
      "Mean must be greater than zero"
    );
  });

  const quantileTestData = [
    [0, 0],
    [0.5, Math.LN2 * m],
    [1, Infinity],
  ];

  it.each(quantileTestData)("calculates the quantile", (p, expected) => {
    expect(pdf.quantile(p)).toBeCloseTo(expected, 6);
  });
});
