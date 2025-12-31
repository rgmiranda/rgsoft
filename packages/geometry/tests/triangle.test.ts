import { describe, expect, it } from "vitest";
import { Triangle } from "../src";
import { Vector2 } from "@rgsoft/linear";

describe(Triangle.name, () => {
  it("creates an instance", () => {
    const t = new Triangle(
      new Vector2([0, 0]),
      new Vector2([0, 1]),
      new Vector2([1, 0])
    );
    expect(t).toBeInstanceOf(Triangle);
  });

  it("calculates the circle", () => {
    const t = new Triangle(
      new Vector2([0, 0]),
      new Vector2([0, 1]),
      new Vector2([1, 0])
    );
    expect(t).toBeInstanceOf(Triangle);
    expect(t.center.x).toBeCloseTo(0.5, 10);
    expect(t.center.y).toBeCloseTo(0.5, 10);
    expect(t.radius).toBeCloseTo(Math.SQRT1_2, 10);
  });

  it("detects point in the circle", () => {
    let p: Vector2;
    const t = new Triangle(
      new Vector2([0, 0]),
      new Vector2([0, 1]),
      new Vector2([1, 0])
    );
    expect(t).toBeInstanceOf(Triangle);
    p = new Vector2([0.25, 0.25]);
    expect(t.inCircle(p)).toBe(true);
    p = new Vector2([0.5, 0.5]);
    expect(t.inCircle(p)).toBe(true);
    p = new Vector2([1.5, 1.5]);
    expect(t.inCircle(p)).toBe(false);
  });

  describe("edges", () => {
    const t = new Triangle(
      new Vector2([0, 0]),
      new Vector2([0, 1]),
      new Vector2([1, 0])
    );
    const testData: [Vector2, Vector2, boolean][] = [
      [new Vector2([0, 0]), new Vector2([1, 0]), true],
      [new Vector2([0, 0]), new Vector2([0, 1]), true],
      [new Vector2([0, 0]), new Vector2([1, 0]), true],
      [new Vector2([0, 0]), new Vector2([2, 0]), false],
      [new Vector2([0, 2]), new Vector2([1, 0]), false],
      [new Vector2([1, 0]), new Vector2([3, 0]), false],
      [new Vector2([0, 1]), new Vector2([3, 0]), false],
    ];

    it.each(testData)("detects edges of the triangle", (p, q, result) => {
      expect(t.hasEdge(p, q)).toBe(result);
      expect(t.hasEdge(q, p)).toBe(result);
    });
  });

  it("fails on colinear points", () => {
    let p: Vector2;
    expect(
      () =>
        new Triangle(
          new Vector2([0, 0]),
          new Vector2([1, 1]),
          new Vector2([2, 2])
        )
    ).toThrowError("The points are colinear");
  });

  it("detects vertex of the triangle", () => {
    let p: Vector2;
    const t = new Triangle(
      new Vector2([0, 0]),
      new Vector2([0, 1]),
      new Vector2([1, 0])
    );
    expect(t).toBeInstanceOf(Triangle);

    p = new Vector2([0, 1]);
    expect(t.hasVertex(p)).toBe(true);

    p = new Vector2([0, 2]);
    expect(t.hasVertex(p)).toBe(false);
  });

  it("detects adjacents triangles", () => {
    let ot: Triangle;
    const t = new Triangle(
      new Vector2([0, 0]),
      new Vector2([0, 1]),
      new Vector2([1, 0])
    );
    expect(t).toBeInstanceOf(Triangle);

    ot = new Triangle(
      new Vector2([0, 0]),
      new Vector2([1, 0]),
      new Vector2([1, -2])
    );
    expect(t.isAdjacent(ot)).toBe(true);

    ot = new Triangle(
      new Vector2([0, 1]),
      new Vector2([1, 0]),
      new Vector2([1, 1])
    );
    expect(t.isAdjacent(ot)).toBe(true);

    ot = new Triangle(
      new Vector2([0, 0]),
      new Vector2([2, 0]),
      new Vector2([1, -2])
    );
    expect(t.isAdjacent(ot)).toBe(false);
  });
});
