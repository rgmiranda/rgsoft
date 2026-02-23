import { describe, expect, it } from "vitest";
import { Polygon } from "../src";
import { Vector2 } from "@rgsoft/linear";

describe(Polygon.name, () => {
  it("creates an instance", () => {
    const polygon = new Polygon([
      new Vector2([0, 0]),
      new Vector2([1, 1]),
      new Vector2([0, 1]),
    ]);
    expect(polygon).toBeInstanceOf(Polygon);
  });

  it("fails on wrong number of vertex", () => {
    expect(() => new Polygon([]))
      .toThrowError("At least three vertex are required");
    expect(() => new Polygon([new Vector2([0, 0])]))
      .toThrowError("At least three vertex are required");
    expect(
      () =>
        new Polygon([
          new Vector2([0, 0]),
          new Vector2([1, 1]),
        ]),
    ).toThrowError("At least three vertex are required");
  });

  it("calculates the centroid", () => {
    const polygon = new Polygon(
      [new Vector2([0, 0]), new Vector2([0, 3]), new Vector2([3, 0])]
    );

    expect(polygon.centroid).toEqual(new Vector2([1, 1]));
  });

  it("detects a point in the polygon", () => {
    const polygon = new Polygon(
      [new Vector2([0, 0]), new Vector2([0, 3]), new Vector2([3, 0])],
    );

    expect(polygon.contains(new Vector2([1, 1]))).toBeTruthy();
    expect(polygon.contains(new Vector2([2, 2]))).toBeFalsy();
    expect(polygon.contains(new Vector2([2, 1]))).toBeTruthy();
    expect(polygon.contains(new Vector2([1, 2]))).toBeTruthy();
  });

  it("detects a point on the edge the polygon", () => {
    const polygon = new Polygon(
      [new Vector2([0, 0]), new Vector2([0, 3]), new Vector2([3, 0])]
    );

    expect(polygon.isOnEdge(new Vector2([0, 0]))).toBeTruthy();
    expect(polygon.isOnEdge(new Vector2([2, 1]))).toBeTruthy();
    expect(polygon.isOnEdge(new Vector2([1, 2]))).toBeTruthy();
    expect(polygon.isOnEdge(new Vector2([0, 0]))).toBeTruthy();
    expect(polygon.isOnEdge(new Vector2([1, 1]))).toBeFalsy();
    expect(polygon.isOnEdge(new Vector2([2, 2]))).toBeFalsy();
  });

  const intersectionData = [
      {
        area: new Polygon([
          new Vector2([4, 2]),
          new Vector2([8, 4]),
          new Vector2([6, 4]),
        ]),
        expected: true,
      },
      {
        area: new Polygon([
          new Vector2([-4, -2]),
          new Vector2([12, 14]),
          new Vector2([14, -2]),
        ]),
        expected: true,
      },
      {
        area: new Polygon([
          new Vector2([6, 4]),
          new Vector2([12, 14]),
          new Vector2([14, -2]),
        ]),
        expected: true,
      },
      {
        area: new Polygon([
          new Vector2([10, 10]),
          new Vector2([12, 14]),
          new Vector2([14, -2]),
        ]),
        expected: true,
      },
      {
        area: new Polygon([
          new Vector2([10, 5]),
          new Vector2([12, 14]),
          new Vector2([14, -2]),
        ]),
        expected: true,
      },
      {
        area: new Polygon([
          new Vector2([11, 5]),
          new Vector2([12, 14]),
          new Vector2([14, -2]),
        ]),
        expected: false,
      },
    ];

  it.each(intersectionData)("evaluates intersection", ({ area, expected }) => {
    const polygon = new Polygon([
      new Vector2([0, 0]),
      new Vector2([10, 10]),
      new Vector2([10, 0]),
    ]);
    expect(polygon).toBeInstanceOf(Polygon);
    expect(polygon.intersects(area)).toBe(expected);
    expect(area.intersects(polygon)).toBe(expected);
  });
});
