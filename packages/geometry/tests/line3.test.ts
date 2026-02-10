import { describe, expect, it } from "vitest";
import { Line3 } from "../src";
import { V3_ZERO, Vector3 } from "@rgsoft/linear";
import { SQRT1_2, SQRT2, SQRT3, SQRT3_2 } from "@rgsoft/math";

describe(Line3.name, () => {
  it("creates a new instance", () => {
    const l = new Line3(new Vector3([-2, 0, 0]), new Vector3([-1, -1, -1]));
    expect(l).toBeInstanceOf(Line3);
    expect(l.toString()).toBe("(x, y, z) = (-2, 0, 0) + t(-1, -1, -1)");
  });

  it("fails when constructing with zero vector", () => {
    expect(() => new Line3(new Vector3([-2, 0, 0]), V3_ZERO)).toThrowError(
      "Direction vector cannot be zero.",
    );
  });

  it("retrieves a point at", () => {
    const l = new Line3(new Vector3([2, 0, 0]), new Vector3([-1, -1, -1]));
    expect(l.at(1).equals(new Vector3([1, -1, -1]))).toBeTruthy();
    expect(l.at(-1).equals(new Vector3([3, 1, 1]))).toBeTruthy();
  });

  it("calculates the projection of a point on the line", () => {
    const l = new Line3(new Vector3([1, 0, 0]), new Vector3([1, 1, 1]));
    let p = new Vector3([1, 1, 0]);
    expect(l.project(p)).toEqual(new Vector3([4/3, 1/3, 1/3]));
    p = new Vector3([0.5, 0.5, 0]);
    expect(l.project(p)).toEqual(new Vector3([1, 0, 0]));
  });

  it("calculates the distance of a point to the line", () => {
    const l = new Line3(new Vector3([1, 0, 0]), new Vector3([1, 1, 0]));
    let p = new Vector3([0, 1, 0]);
    expect(l.distanceToPoint(p)).toBeCloseTo(SQRT2);
    p = new Vector3([0.5, 0.5, 0]);
    expect(l.distanceToPoint(p)).toBeCloseTo(SQRT1_2);
  });

  it("calculates the distance to a non parallel line", () => {
    const l1 = new Line3(new Vector3([1, 0, 0]), new Vector3([1, 1, 0]));
    const l2 = new Line3(new Vector3([0, 1, 0]), new Vector3([0, 0, 1]));
    expect(l1.distanceToLine(l2)).toBeCloseTo(SQRT2);
  });

  it("calculates the distance to a parallel line", () => {
    const l1 = new Line3(new Vector3([1, 0, 0]), new Vector3([1, 1, 0]));
    const l2 = new Line3(new Vector3([1, 0, 1]), new Vector3([1, 1, 0]));
    expect(l1.distanceToLine(l2)).toBeCloseTo(1);
  });

  it("detects parallel lines", () => {
    const l1 = new Line3(new Vector3([1, 0, 0]), new Vector3([1, 1, 0]));
    let l2 = new Line3(new Vector3([1, 0, 1]), new Vector3([1, 1, 0]));
    expect(l1.isParallelTo(l2)).toBe(true);
    l2 = new Line3(new Vector3([1, 0, 1]), new Vector3([1, 1, 1]));
    expect(l1.isParallelTo(l2)).toBe(false);
  });

  it("calculates the projection T param of a point on the line", () => {
    const l = new Line3(new Vector3([1, 0, 0]), new Vector3([1, 1, 1]));
    const p = new Vector3([0.5, 0.5, 0]);
    expect(l.projectT(p)).toBe(0);
  });
});
