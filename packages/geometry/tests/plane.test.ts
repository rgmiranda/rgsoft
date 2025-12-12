import { describe, expect, it } from "vitest";
import { Line3, Plane } from "../src";
import { V3_UNIT_X, V3_UNIT_Y, V3_UNIT_Z, Vector3 } from "@rgsoft/linear";
import { SQRT3 } from "@rgsoft/math";

describe(Plane.name, () => {
  it("creates plane from normal vector and d", () => {
    const d = 1;
    const normal = new Vector3([2, 0, 0]);
    const p = new Plane(normal, d);
    expect(p.normal.values).toEqual([1, 0, 0]);
    expect(p.d).toEqual(1);
    expect(p.toGeneralForm()).toEqual({ A: 1, B: 0, C: 0, D: 1 });
    expect(p.toPointNormal()).toEqual({
      normal: new Vector3([1, 0, 0]),
      point: new Vector3([-1, 0, 0]),
    });
  });

  it("creates plane from normal vector and point", () => {
    const point = new Vector3([2, 2, 2]);
    const normal = new Vector3([2, 0, 0]);
    const p = Plane.fromPointNormal(point, normal);
    expect(p.normal.values).toEqual([1, 0, 0]);
    expect(p.d).toEqual(-2);
    expect(p.toGeneralForm()).toEqual({ A: 1, B: 0, C: 0, D: -2 });
    expect(p.toPointNormal()).toEqual({
      normal: new Vector3([1, 0, 0]),
      point: new Vector3([2, 0, 0]),
    });
  });

  it("creates plane from thre points", () => {
    const p = Plane.fromPoints(V3_UNIT_X, V3_UNIT_Y, V3_UNIT_Z);
    expect(p.normal.x).toBeCloseTo(SQRT3 / 3);
    expect(p.normal.y).toBeCloseTo(SQRT3 / 3);
    expect(p.normal.z).toBeCloseTo(SQRT3 / 3);
    expect(p.d).toBeCloseTo(-SQRT3 / 3, 6);
  });

  it("calculates distance to point", () => {
    const d = -2;
    const normal = new Vector3([1, 0, 0]);
    const plane = new Plane(normal, d);
    let point = new Vector3([0, 2, 3]);
    expect(plane.distanceToPoint(point)).toBe(-2);
    point = new Vector3([-8, 2, 3]);
    expect(plane.distanceToPoint(point)).toBe(-10);
    point = new Vector3([12, 2, 3]);
    expect(plane.distanceToPoint(point)).toBe(10);
  });

  it("project point onto a plane", () => {
    const d = -7;
    const normal = new Vector3([1, 0, 0]);
    const plane = new Plane(normal, d);
    let point = new Vector3([0, 2, 3]);
    expect(plane.projectPoint(point)).toEqual(new Vector3([7, 2, 3]));
    point = new Vector3([-8, -21, 3]);
    expect(plane.projectPoint(point)).toEqual(new Vector3([7, -21, 3]));
    point = new Vector3([-8, 0, 0]);
    expect(plane.projectPoint(point)).toEqual(new Vector3([7, 0, 0]));
  });

  it("gets the intersection between a line and a plane", () => {
    const d = -1;
    const normal = new Vector3([1, 0, 0]);
    const plane = new Plane(normal, d);
    let line = new Line3(new Vector3([0, 2, 0]), new Vector3([1, 1, 1]));
    expect(plane.intersectLine(line)).toEqual(new Vector3([1, 3, 1]));
    line = new Line3(new Vector3([0, 2, 0]), new Vector3([1, 1, 0]));
    expect(plane.intersectLine(line)).toEqual(new Vector3([1, 3, 0]));
    line = new Line3(new Vector3([0, 2, 0]), new Vector3([0, 1, 1]));
    expect(plane.intersectLine(line)).toEqual(null);
  });
});
