import { beforeAll, describe, expect, it } from "vitest";
import { Gaussian } from "../../src/pdf";
import { TWO_PI } from "@rgsoft/math";

describe(Gaussian.name, () => {
  let pdf: Gaussian;
  const m = 0;
  const v = 1;
  const sd = Math.sqrt(v);

  beforeAll(() => {
    pdf = new Gaussian(m, v);
  });

  it("gets values", () => {
    const result = pdf.sample();
    expect(typeof result).toBe("number");
  });

  it("gets values", () => {
    const result = pdf.sample();
    expect(typeof result).toBe("number");
  });

  it("gets the mean", () => {
    const result = pdf.getMean();
    expect(result).toBe(m);
  });

  it("gets the variance", () => {
    const result = pdf.getVariance();
    expect(result).toBe(v);
  });

  it("gets the standard deviation", () => {
    const result = pdf.getStdDev();
    expect(result).toBe(v);
  });

  it("gets the density", () => {
    const result = pdf.density(0);
    expect(result).toBeCloseTo(1 / Math.sqrt(TWO_PI), 6);
  });

  it("gets the accumulated", () => {
    expect(pdf.getAccumulated(-3 * sd)).toBeCloseTo(0.00135, 4);
    expect(pdf.getAccumulated(-2 * sd)).toBeCloseTo(0.02275, 4);
    expect(pdf.getAccumulated(-1 * sd)).toBeCloseTo(0.15866, 4);
    expect(pdf.getAccumulated(0 * sd)).toBeCloseTo(0.5, 4);
    expect(pdf.getAccumulated(1 * sd)).toBeCloseTo(0.84134, 4);
    expect(pdf.getAccumulated(2 * sd)).toBeCloseTo(0.97725, 4);
    expect(pdf.getAccumulated(3 * sd)).toBeCloseTo(0.99865, 4);
  });

  it('fails on invalid variance', () => {
    expect(() => new Gaussian(0, -1)).toThrowError("Variance must be positive");
  });
  
  const quantileTestData = [
    [0, -Infinity],
    [0.0013499, m - 3 * sd],
    [0.5, m],
    [0.9986501, m + 3 * sd],
    [1, Infinity],
  ];
  
  it.each(quantileTestData)('calculates the quantile', (p, expected) => {
    expect(pdf.quantile(p)).toBeCloseTo(expected, 6);
  });

  it('fails on invalid quantile', () => {
    expect(() => pdf.quantile(-0.2)).toThrowError(
      "Accumulated value must be between 0 and 1"
    );
    expect(() => pdf.quantile(1.5)).toThrowError(
      "Accumulated value must be between 0 and 1"
    );
  });
});
