import { describe, expect, it } from "vitest";
import { Plane } from "../src";
import { V3_UNIT_X, V3_UNIT_Y, V3_UNIT_Z, Vector3 } from "@rgsoft/linear";

describe(Plane.name, () => {

  it('creates plane from normal vector and point', () => {
    const point =  new Vector3([2, 2, 2]);
    const normal =  new Vector3([2, 0, 0]);
    const p = Plane.fromPointNormal(point, normal);
    expect(p.normal.values).toEqual([1, 0, 0]);
    expect(p.d).toEqual(-2);
    expect(p.toGeneralForm()).toEqual({A: 1, B: 0, C: 0, D: -2});
  });

  it('creates plane from thre points', () => {
    const p = Plane.fromPoints(V3_UNIT_X, V3_UNIT_Y, V3_UNIT_Z);
    expect(p.normal.values).toEqual([1, 0, 0]);
    expect(p.d).toEqual(-2);
    expect(p.toGeneralForm()).toEqual({A: 1, B: 0, C: 0, D: -2});
  });


});
