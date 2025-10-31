import { beforeAll, describe, expect, it } from "vitest";
import { Uniform } from "../../src";

describe(Uniform.name, () => {
  let pdf: Uniform;
  const min = -10;
  const max = 10;

  beforeAll(() => {
    pdf = new Uniform(min, max);
  });

  it("gets values", () => {
    const values = Array(10)
      .fill(false)
      .map(() => pdf.sample());
    values.forEach((v) => {
      expect(v).toBeGreaterThanOrEqual(min);
      expect(v).toBeLessThanOrEqual(max);
    });
  });

  it("gets the mean", () => {
    const result = pdf.getMean();
    expect(result).toBe(0);
  });

  it("gets the variance", () => {
    const result = pdf.getVariance();
    expect(result).toBe(20 ** 2 / 12);
  });

  it("gets the standard deviation", () => {
    const result = pdf.getStdDev();
    expect(result).toBeCloseTo(20 / Math.sqrt(12), 6);
  });

  it("gets the density", () => {
    expect(pdf.density(0)).toBe(1 / 20);
    expect(pdf.density(10)).toBe(1 / 20);
    expect(pdf.density(11)).toBe(0);
    expect(pdf.density(-10)).toBe(1 / 20);
    expect(pdf.density(-11)).toBe(0);
  });

  it("gets the accumulated", () => {
    expect(pdf.getAccumulated(-11)).toBe(0);
    expect(pdf.getAccumulated(-10)).toBe(0);
    expect(pdf.getAccumulated(-5)).toBe(0.25);
    expect(pdf.getAccumulated(0)).toBe(0.5);
    expect(pdf.getAccumulated(5)).toBe(0.75);
    expect(pdf.getAccumulated(10)).toBe(1);
    expect(pdf.getAccumulated(11)).toBe(1);
  });
  
  it('fails on invalid range', () => {
    expect(() => new Uniform(9, 8)).toThrowError("Min must be lower than max");
  });

  const quantileTestData = [
    [0, min],
    [0.25, min +  (max - min) * 0.25],
    [0.5, (min + max) * 0.5],
    [0.75, min + (max - min) * 0.75],
    [1, max],
  ];

  it.each(quantileTestData)("calculates the quantile", (p, expected) => {
    expect(pdf.quantile(p)).toBeCloseTo(expected, 6);
  });
});
