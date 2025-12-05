import { describe, expect, it } from "vitest";
import { Vector } from "../src";
import { HALF_PI, PI, SQRT2 } from "@rgsoft/math";

describe(Vector.name, () => {
  it("creates new instance", () => {
    const v = new Vector([0, 1]);
    expect(v).toBeInstanceOf(Vector);
  });

  it("calculates magnitude", () => {
    const v = new Vector([0, 1]);
    expect(v.mag).toBe(1);

    const w = v.add(new Vector([1, 0]));
    expect(w.mag).toBe(Math.SQRT2);
  });

  it("sets magnitude", () => {
    const v = new Vector([3, -4]);
    expect(v.mag).toBe(5);
    const w = v.mult(2);
    expect(w.mag).toBe(10);
    expect(w.at(0)).toBe(6);
    expect(w.at(1)).toBe(-8);
  });

  it("normalizes vector", () => {
    let v = new Vector([0, 3]);
    expect(v.mag).toBe(3);
    v = v.normalize();
    expect(v.mag).toBe(1);
    expect(v.at(1)).toBe(1);

    v = new Vector([5, 5]);
    expect(v.mag).toBeCloseTo(5 * SQRT2, 6);
    v = v.normalize();
    expect(v.mag).toBeCloseTo(1, 6);
    expect(v.at(0)).toBeCloseTo(Math.SQRT1_2, 6);
    expect(v.at(1)).toBeCloseTo(Math.SQRT1_2, 6);
  });

  it("does not normalizes vector zero", () => {
    let v = new Vector([0, 0]);
    v = v.normalize();
    expect(v.mag).toBe(0);
    expect(v.at(0)).toBe(0);
    expect(v.at(1)).toBe(0);
  });

  it("multiplies a vector", () => {
    let v = new Vector([0, 3]);
    v = v.mult(4);
    expect(v.mag).toBe(12);
    expect(v.at(1)).toBe(12);

    v = new Vector([5, 5]);
    v = v.mult(2);
    expect(v.mag).toBeCloseTo(10 * Math.SQRT2, 6);
    expect(v.at(0)).toBe(10);
    expect(v.at(1)).toBe(10);
  });

  it("divides a vector", () => {
    let v = new Vector([0, 12]);
    v = v.div(4);
    expect(v.mag).toBe(3);
    expect(v.at(1)).toBe(3);

    v = new Vector([5, 5]);
    v = v.div(5);
    expect(v.mag).toBeCloseTo(Math.SQRT2, 6);
    expect(v.at(0)).toBe(1);
    expect(v.at(1)).toBe(1);
  });

  it("calculates the dot product", () => {
    let v = new Vector([-2, 3]);
    let u = new Vector([2, 3]);
    expect(v.dot(u)).toBe(5);
    expect(u.dot(v)).toBe(5);
    u = u.mult(4);
    expect(u.dot(v)).toBe(20);
    v = v.mult(0.5);
    expect(u.dot(v)).toBe(10);
  });

  it("adds a vector", () => {
    let v = new Vector([-2, 3]);
    v = v.add(new Vector([3, -5]));
    expect(v.at(0)).toBe(1);
    expect(v.at(1)).toBe(-2);
  });

  it("subs a vector", () => {
    let v = new Vector([-2, 3]);
    v = v.sub(new Vector([3, -5]));
    expect(v.at(0)).toBe(-5);
    expect(v.at(1)).toBe(8);
  });

  it("calculates distance against another vector", () => {
    const v = new Vector([7, 2]);
    const d = v.dist(new Vector([3, -1]));
    expect(d).toBe(5);
  });

  it("verifies equality with another vector", () => {
    const v1 = new Vector([7, 2]);
    const v2 = new Vector([7, 2]);
    const v3 = new Vector([9, 2]);
    expect(v1.equals(v2)).toBeTruthy();
    expect(v1.equals(v3)).toBeFalsy();
  });

  it("calculates angle against another vector", () => {
    let v1 = new Vector([1, 0]);
    let v2 = new Vector([0, 1]);
    expect(v1.angleTo(v2)).toBeCloseTo(Math.PI * 0.5, 6);

    v2 = new Vector([1, 1]);
    expect(v1.angleTo(v2)).toBeCloseTo(Math.PI * 0.25, 6);

    v1 = new Vector([-1, 1]);
    expect(v1.angleTo(v2)).toBeCloseTo(Math.PI * 0.5, 6);
  });

  it("calculates projection on another vector", () => {
    let v1 = new Vector([3, 4]);
    let v2 = new Vector([1, 2]);
    let proj = v1.projection(v2);
    expect(proj.at(0)).toBe(2.2);
    expect(proj.at(1)).toBe(4.4);

    v1 = new Vector([-2, 2]);
    v2 = new Vector([1, 1]);
    proj = v1.projection(v2);
    expect(proj.at(0)).toBe(0);
    expect(proj.at(1)).toBe(0);
  });

  it("clones a vector", () => {
    const v = new Vector([7, 2]);
    const cv = v.clone();
    expect(v.equals(cv)).toBeTruthy();
    expect(cv).not.toBe(v);
    expect(cv).toBeInstanceOf(Vector);
  });

  it("limits a vector magnitude", () => {
    let v = new Vector([8, -6]);
    expect(v.mag).toBe(10);
    v = v.limit(5);
    expect(v.mag).toBeCloseTo(5, 6);
    expect(v.at(0)).toBeCloseTo(4, 6);
    expect(v.at(1)).toBeCloseTo(-3, 6);
  });

  it("detects the zero vector", () => {
    let v = Vector.getZero(2);
    expect(v.isZero).toBeTruthy();

    v = new Vector([0, 0]);
    expect(v.isZero).toBeTruthy();

    v = new Vector([1, 0]);
    expect(v.isZero).toBeFalsy();

    v = Vector.getZero(4);
    expect(v.isZero).toBeTruthy();

    v = new Vector([0, 0, 0]);
    expect(v.isZero).toBeTruthy();

    v = new Vector([1, 0, -1]);
    expect(v.isZero).toBeFalsy();
  });
});
