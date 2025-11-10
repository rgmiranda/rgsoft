import { describe, expect, it } from "vitest";
import { V3_UNIT_X, V3_UNIT_Y, V3_UNIT_Z, V3_ZERO, Vector3 } from "../src";
import { HALF_PI, PI, QUARTER_PI, SQRT1_2, SQRT2, SQRT3 } from "@rgsoft/math";

describe(Vector3.name, () => {
  it("creates new instance", () => {
    const v = new Vector3([0, 1, 0]);
    expect(v).toBeInstanceOf(Vector3);
  });

  it("calculates magnitude", () => {
    let v = new Vector3([0, 1, 0]);
    expect(v.mag).toBe(1);

    v = new Vector3([1, 1, 0]);
    expect(v.mag).toBe(Math.SQRT2);
  });

  it("calculates azimuth and polar", () => {
    let v = new Vector3([1, 1, 0]);
    expect(v.azimuth).toBe(QUARTER_PI);
    expect(v.polar).toBe(HALF_PI);

    v = new Vector3([SQRT1_2, SQRT1_2, 1]);
    expect(v.azimuth).toBe(QUARTER_PI);
    expect(v.polar).toBe(QUARTER_PI);
  });

  it("calculates angle on vector zero", () => {
    const v = V3_ZERO;
    expect(v.azimuth).toBe(0);
    expect(v.polar).toBe(0);
  });

  it("normalizes vector", () => {
    let v = new Vector3([0, 3, 0]);
    expect(v.mag).toBe(3);
    v = v.normalize();
    expect(v.mag).toBe(1);
    expect(v.x).toBe(0);
    expect(v.y).toBe(1);
    expect(v.z).toBe(0);

    v = new Vector3([5, 5, 0]);
    expect(v.mag).toBeCloseTo(SQRT2 * 5, 6);
    v.normalize();
    expect(v.mag).toBeCloseTo(1, 6);
    expect(v.x).toBeCloseTo(Math.SQRT1_2, 6);
    expect(v.y).toBeCloseTo(Math.SQRT1_2, 6);
    expect(v.z).toBeCloseTo(0);
  });

  it("does not normalizes vector zero", () => {
    let v = V3_ZERO;
    v = v.normalize();
    expect(v.mag).toBe(0);
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
  });

  it("multiplies a vector", () => {
    let v = new Vector3([0, 3, -4]);
    expect(v.mag).toBe(5);
    v = v.mult(4);
    expect(v.mag).toBe(20);
    expect(v.x).toBe(0);
    expect(v.y).toBe(12);
    expect(v.z).toBe(-16);

    v = new Vector3([5, 5, -5]);
    v = v.mult(2);
    expect(v.mag).toBeCloseTo(10 * SQRT3, 6);
    expect(v.x).toBe(10);
    expect(v.y).toBe(10);
    expect(v.z).toBe(-10);
  });

  it("divides a vector", () => {
    let v = new Vector3([0, 12, 0]);
    v = v.div(4);
    expect(v.mag).toBe(3);
    expect(v.x).toBe(0);
    expect(v.y).toBe(3);
    expect(v.z).toBe(0);

    v = new Vector3([5, 5, 5]);
    v = v.div(5);
    expect(v.mag).toBeCloseTo(SQRT3, 6);
    expect(v.x).toBe(1);
    expect(v.y).toBe(1);
    expect(v.z).toBe(1);
  });

  it("calculates the dot product", () => {
    const v = new Vector3([-2, 3, 1]);
    const u = new Vector3([2, 3, 1]);
    expect(v.dot(u)).toBe(6);
    expect(u.dot(v)).toBe(6);
    u.mult(4);
    expect(u.dot(v)).toBe(24);
    v.mult(0.5);
    expect(u.dot(v)).toBe(12);
  });

  it("adds a vector", () => {
    let v = new Vector3([-2, 3, -4]);
    v = v.add(new Vector3([3, -5, 3]));
    expect(v.x).toBe(1);
    expect(v.y).toBe(-2);
    expect(v.z).toBe(-1);
  });

  it("subs a vector", () => {
    let v = new Vector3([-2, 3, 0]);
    v = v.sub(new Vector3([3, -5, -1]));
    expect(v.x).toBe(-5);
    expect(v.y).toBe(8);
    expect(v.z).toBe(1);
  });

  it("calculates distance against another vector", () => {
    const v = new Vector3([7, 2, 1]);
    const d = v.dist(new Vector3([1, -1, -1]));
    expect(d).toBe(7);
  });

  it("verifies equality with another vector", () => {
    const v1 = new Vector3([7, 2, -3.5]);
    const v2 = new Vector3([7, 2, -3.5]);
    const v3 = new Vector3([9, 2, -3.5]);
    expect(v1.equals(v2)).toBeTruthy();
    expect(v1.equals(v3)).toBeFalsy();
  });

  it("calculates angle against another vector", () => {
    let v1 = new Vector3([0, 1, 0]);
    let v2 = new Vector3([1, 0, 0]);
    expect(v1.angleTo(v2)).toBeCloseTo(HALF_PI, 6);

    v2 = new Vector3([1, 1, 0]);
    expect(v1.angleTo(v2)).toBeCloseTo(QUARTER_PI, 6);

    v1 = new Vector3([-1, 1, 0]);
    expect(v1.angleTo(v2)).toBeCloseTo(HALF_PI, 6);
  });

  it("calculates projection on another vector", () => {
    let v1 = new Vector3([3, 4, 0]);
    let v2 = new Vector3([1, 2, 0]);
    let proj = v1.projection(v2);
    expect(proj.x).toBe(2.2);
    expect(proj.y).toBe(4.4);
    expect(proj.z).toBe(0);

    v1 = new Vector3([-2, 1, 0]);
    proj = v1.projection(v2);
    expect(V3_ZERO.equals(proj)).toBeTruthy();
  });

  it("clones a vector", () => {
    const v = new Vector3([7, 2, 3]);
    const cv = v.clone();
    expect(v.equals(cv)).toBeTruthy();
    expect(cv).not.toBe(v);
    expect(cv).toBeInstanceOf(Vector3);
  });

  it("rotates a vector", () => {
    const v = new Vector3([1, 1, 1]);
    v.rotateX(PI);
    expect(v.x).toBeCloseTo(1, 6);
    expect(v.y).toBeCloseTo(-1, 6);
    expect(v.z).toBeCloseTo(-1, 6);

    v.rotateY(PI);
    expect(v.x).toBeCloseTo(-1, 6);
    expect(v.y).toBeCloseTo(-1, 6);
    expect(v.z).toBeCloseTo(1, 6);
  });

  it("limits a vector magnitude", () => {
    const v = new Vector3([12, -6, 4]);
    expect(v.mag).toBe(14);
    v.limit(7);
    expect(v.mag).toBe(7);
    expect(v.x).toBe(6);
    expect(v.y).toBe(-3);
    expect(v.z).toBe(2);
  });

  it("creates vector from spherical", () => {
    let v = Vector3.fromSpherical(HALF_PI, QUARTER_PI, 2);
    expect(v.x).toBeCloseTo(SQRT2, 6);
    expect(v.y).toBeCloseTo(SQRT2, 6);
    expect(v.z).toBeCloseTo(0, 6);

    v = Vector3.fromSpherical(HALF_PI, 0, 1);
    expect(v.x).toBeCloseTo(1, 6);
    expect(v.y).toBeCloseTo(0, 6);
    expect(v.z).toBeCloseTo(0, 6);
  });

  const crossProductTestData = [
    [V3_UNIT_X, V3_UNIT_Y, V3_UNIT_Z],
    [
      new Vector3([SQRT1_2, SQRT1_2, 0]),
      new Vector3([-SQRT1_2, SQRT1_2, 0]),
      V3_UNIT_Z,
    ],
    [
      new Vector3([SQRT1_2, SQRT1_2, 0]),
      new Vector3([SQRT1_2, -SQRT1_2, 0]),
      V3_UNIT_Z.mult(-1),
    ],
  ];

  it.each(crossProductTestData)("calculates the cross product", (u, v, w) => {
    expect(w.equals(u.cross(v))).toBeTruthy();
  });
});
