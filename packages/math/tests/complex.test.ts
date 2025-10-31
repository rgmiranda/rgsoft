import { describe, expect, it } from "vitest";
import { Complex } from "../src";

describe(Complex.name, () => {
  it("creates a new complex instance", () => {
    let cpx = new Complex(0, 1);
    expect(cpx).toBeInstanceOf(Complex);
    expect(cpx.a).toBe(0);
    expect(cpx.b).toBe(1);

    cpx = Complex.fromPolar(Math.SQRT2, Math.PI * 0.25);
    expect(cpx).toBeInstanceOf(Complex);
    expect(cpx.a).toBeCloseTo(1, 6);
    expect(cpx.b).toBeCloseTo(1, 6);
  });

  const magnitudes = [
    [1, 0, 1],
    [-1, 0, 1],
    [0, 1, 1],
    [0, -1, 1],
    [0, 0, 0],
    [1, -1, Math.SQRT2],
    [5, 12, 13],
  ];

  it.each(magnitudes)("calculates the magnitude correctly", (a, b, mag) => {
    const cpx = new Complex(a, b);
    expect(cpx.mag).toBeCloseTo(mag, 6);
  });

  it("calculates the conjugate", () => {
    const cpx = new Complex(8, 4);
    const conj = cpx.conjugate();
    expect(conj.a).toBe(cpx.a);
    expect(conj.b).toBe(-1 * cpx.b);
  });

  it("adds a real number", () => {
    let cpx = new Complex(8, 5);
    cpx = cpx.add(22);

    expect(cpx.a).toBe(30);
    expect(cpx.b).toBe(5);
  });

  it("adds a complex number", () => {
    let cpx1 = new Complex(8, 5);
    let cpx2 = new Complex(-5, -8);
    const cpx = cpx1.add(cpx2);

    expect(cpx.a).toBe(3);
    expect(cpx.b).toBe(-3);
  });

  it("subs a real number", () => {
    let cpx = new Complex(-7, 2);
    cpx = cpx.sub(-8);

    expect(cpx.a).toBe(1);
    expect(cpx.b).toBe(2);
  });

  it("subs a complex number", () => {
    let cpx1 = new Complex(8, 5);
    let cpx2 = new Complex(-5, -8);
    const cpx = cpx1.sub(cpx2);

    expect(cpx.a).toBe(13);
    expect(cpx.b).toBe(13);
  });

  it("multiplies by real number", () => {
    let cpx = new Complex(8, 5);
    cpx = cpx.mult(2);

    expect(cpx.a).toBe(16);
    expect(cpx.b).toBe(10);
  });

  it("multiplies by complex number", () => {
    let cpx1 = new Complex(2, 1);
    let cpx2 = new Complex(-1, -1);
    const cpx = cpx1.mult(cpx2);

    expect(cpx.a).toBe(-1);
    expect(cpx.b).toBe(-3);
  });

  it("divides by real number", () => {
    let cpx = new Complex(8, 5);
    cpx = cpx.div(2);

    expect(cpx.a).toBe(4);
    expect(cpx.b).toBe(2.5);
  });

  it("fails on division by zero", () => {
    let cpx = new Complex(8, 5);
    expect(() => cpx.div(0)).toThrow("Division by zero");
  });

  it("divides by complex number", () => {
    let cpx1 = new Complex(2, 1);
    let cpx2 = new Complex(-1, -1);
    let cpx = cpx1.div(cpx2);

    expect(cpx.a).toBe(-1.5);
    expect(cpx.b).toBe(0.5);

    cpx1 = new Complex(-2, -2);
    cpx2 = new Complex(-2, 0);
    cpx = cpx1.div(cpx2);

    expect(cpx.a).toBe(1);
    expect(cpx.b).toBe(1);
  });

  it("fails on division by zero complex", () => {
    let cpx = new Complex(8, 5);
    let d = new Complex(0, 0);
    expect(() => cpx.div(d)).toThrow("Division by zero");
  });

  it("gets the square of a complex number", () => {
    let cpx = new Complex(4, 0);
    cpx = cpx.sqrt();

    expect(cpx.a).toBe(2);
    expect(cpx.b).toBe(0);

    cpx = new Complex(3, 4);
    cpx = cpx.sqrt();

    expect(cpx.mag).toBe(Math.sqrt(5));
  });

  it("applies the pow to a complex number", () => {
    let cpx = new Complex(4, 0);
    cpx = cpx.pow(3);

    expect(cpx.a).toBe(64);
    expect(cpx.b).toBe(0);
  });

  it("gets the argument of a complex number", () => {
    let cpx = new Complex(4, 0);
    expect(cpx.arg).toBe(0);

    cpx = new Complex(3, 3);
    expect(cpx.arg).toBe(Math.PI * 0.25);
  });

  it("gets the argument of a complex number", () => {
    let c = new Complex(4, 0);
    let p = new Complex(4, 0);
    expect(p.equals(c)).toBeTruthy();

    c = new Complex(4, -5);
    p = new Complex(4, 0);
    expect(p.equals(c)).toBeFalsy();
  });

  const toStringData = [
    [1, 1, "1 + i"],
    [-1, 1, "-1 + i"],
    [1, -1, "1 - i"],
    [8, -4, "8 - 4i"],
    [8, 7, "8 + 7i"],
  ];
  it.each(toStringData)("converts to string", (a: any, b: any, str: any) => {
    let cpx = new Complex(a, b);
    expect(cpx.toString()).toBe(str);
  });
});
