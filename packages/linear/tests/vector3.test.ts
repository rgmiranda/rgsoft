import { describe, expect, it } from "vitest";
import { V3_ZERO, Vector3 } from "../src";
import { HALF_PI, PI, QUARTER_PI, SQRT1_2, SQRT2, SQRT3 } from "@rgsoft/math";

describe(Vector3.name, () => {
  it("creates new instance", () => {
    const v = new Vector3(0, 1, 0);
    expect(v).toBeInstanceOf(Vector3);
  });

  it("calculates magnitude", () => {
    const v = new Vector3(0, 1, 0);
    expect(v.mag).toBe(1);

    v.x = 1;
    expect(v.mag).toBe(Math.SQRT2);
  });

  it("sets magnitude", () => {
    const v = new Vector3(3, -4, 0);
    expect(v.mag).toBe(5);
    v.mag = 10;
    expect(v.mag).toBe(10);
    expect(v.x).toBe(6);
    expect(v.y).toBe(-8);
    expect(v.z).toBe(0);
  });

  it("calculates azimuth and polar", () => {
    const v = new Vector3(1, 1, 0);
    expect(v.azimuth).toBe(QUARTER_PI);
    expect(v.polar).toBe(HALF_PI);
    
    v.x = SQRT1_2;
    v.y = SQRT1_2;
    v.z = 1;
    expect(v.azimuth).toBe(QUARTER_PI);
    expect(v.polar).toBe(QUARTER_PI);
  });

  it("calculates angle on vector zero", () => {
    const v = V3_ZERO.copy();
    expect(v.azimuth).toBe(0);
    expect(v.polar).toBe(0);
  });

  it("normalizes vector", () => {
    const v = new Vector3(0, 3, 0);
    v.normalize();
    expect(v.mag).toBe(1);
    expect(v.x).toBe(0);
    expect(v.y).toBe(1);
    expect(v.z).toBe(0);

    v.x = 5;
    v.y = 5;
    v.z = 0;
    v.normalize();
    expect(v.mag).toBeCloseTo(1, 6);
    expect(v.x).toBeCloseTo(Math.SQRT1_2, 6);
    expect(v.y).toBeCloseTo(Math.SQRT1_2, 6);
    expect(v.z).toBeCloseTo(0);
  });

  it("does not normalizes vector zero", () => {
    const v = V3_ZERO.copy();
    v.normalize();
    expect(v.mag).toBe(0);
    expect(v.x).toBe(0);
    expect(v.y).toBe(0);
    expect(v.z).toBe(0);
  });

  it("multiplies a vector", () => {
    const v = new Vector3(0, 3, -4);
    expect(v.mag).toBe(5);
    v.mult(4);
    expect(v.mag).toBe(20);
    expect(v.x).toBe(0);
    expect(v.y).toBe(12);
    expect(v.z).toBe(-16);

    v.x = 5;
    v.y = 5;
    v.z = -5;
    v.mult(2);
    expect(v.mag).toBeCloseTo(10 * SQRT3, 6);
    expect(v.x).toBe(10);
    expect(v.y).toBe(10);
    expect(v.z).toBe(-10);
  });

  it("copies and multiplies a vector", () => {
    const v = new Vector3(4, 3, 0);
    const w = Vector3.mult(v, 2);
    expect(v.mag).toBe(5);
    expect(w.mag).toBe(10);
  });

  it("divides a vector", () => {
    const v = new Vector3(0, 12, 0);
    v.div(4);
    expect(v.mag).toBe(3);
    expect(v.x).toBe(0);
    expect(v.y).toBe(3);
    expect(v.z).toBe(0);

    v.x = 5;
    v.y = 5;
    v.z = 5;
    v.div(5);
    expect(v.mag).toBeCloseTo(SQRT3, 6);
    expect(v.x).toBe(1);
    expect(v.y).toBe(1);
  });

  it("copies and divides a vector", () => {
    const v = new Vector3(4, 8, 8);
    const w = Vector3.div(v, 2);
    expect(v.mag).toBe(12);
    expect(w.mag).toBe(6);
  });

  it("calculates the dot product", () => {
    const v = new Vector3(-2, 3, 1);
    const u = new Vector3(2, 3, 1);
    expect(v.dot(u)).toBe(6);
    expect(u.dot(v)).toBe(6);
    u.mult(4);
    expect(u.dot(v)).toBe(24);
    v.mult(0.5);
    expect(u.dot(v)).toBe(12);
  });

  it("adds a vector", () => {
    const v = new Vector3(-2, 3, -4);
    v.add(new Vector3(3, -5, 3));
    expect(v.x).toBe(1);
    expect(v.y).toBe(-2);
    expect(v.z).toBe(-1);
  });

  it("copies and adds a vector", () => {
    const v = new Vector3(3, 4, 12);
    const w = Vector3.add(v, new Vector3(-1, -1, -6));
    expect(v.mag).toBe(13);
    expect(w.mag).toBe(7);
  });

  it("subs a vector", () => {
    const v = new Vector3(-2, 3, 0);
    v.sub(new Vector3(3, -5, -1));
    expect(v.x).toBe(-5);
    expect(v.y).toBe(8);
    expect(v.z).toBe(1);
  });

  it("copies and subs a vector", () => {
    const v = new Vector3(12, 3, -4);
    const w = Vector3.sub(v, new Vector3(10, 2, -2));
    expect(v.mag).toBe(13);
    expect(w.mag).toBe(3);
  });

  it("calculates distance against another vector", () => {
    const v = new Vector3(7, 2, 1);
    const d = v.dist(new Vector3(1, -1, -1));
    expect(d).toBe(7);
  });

  it("verifies equality with another vector", () => {
    const v1 = new Vector3(7, 2, -3.5);
    const v2 = new Vector3(7, 2, -3.5);
    expect(v1.equals(v2)).toBeTruthy();

    v2.x = 9;
    expect(v1.equals(v2)).toBeFalsy();
  });

  it("calculates angle against another vector", () => {
    const v1 = new Vector3(0, 1, 0);
    const v2 = new Vector3(1, 0, 0);
    expect(v1.angleTo(v2)).toBeCloseTo(HALF_PI, 6);

    v2.y = 1;
    expect(v1.angleTo(v2)).toBeCloseTo(QUARTER_PI, 6);

    v1.x = -1;
    expect(v1.angleTo(v2)).toBeCloseTo(HALF_PI, 6);
  });

  it("calculates projection on another vector", () => {
    const v1 = new Vector3(3, 4, 0);
    const v2 = new Vector3(1, 2, 0);
    let proj = v1.projection(v2);
    expect(proj.x).toBe(2.2);
    expect(proj.y).toBe(4.4);
    expect(proj.z).toBe(0);

    v1.x = -2;
    v1.y = 1;
    proj = v1.projection(v2);
    expect(V3_ZERO.equals(proj)).toBeTruthy();
  });

  it("copies a vector", () => {
    const v = new Vector3(7, 2, 3);
    const cv = v.copy();
    expect(v.equals(cv)).toBeTruthy();
    expect(cv).not.toBe(v);
  });

  it("rotates a vector", () => {
    const v = new Vector3(1, 1, 1);
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
    const v = new Vector3(12, -6, 4);
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
});
