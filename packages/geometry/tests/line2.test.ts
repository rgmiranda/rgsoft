import { describe, expect, it } from "vitest";
import { Line2 } from "../src/line2";
import { V2_ZERO, Vector2 } from "@rgsoft/linear";
import { SQRT1_2 } from "@rgsoft/math";

describe(Line2.name, () => {
  it("creates a new instance", () => {
    const l = Line2.fromPoints(new Vector2([-1, -1]), new Vector2([-2, 0]));
    expect(l).toBeInstanceOf(Line2);
    expect(l.toString()).toBe("1x + 1y + 2 = 0");
  });

  it("fails on invalid director", () => {
    expect(() => new Line2(new Vector2([-1, -1]), V2_ZERO)).toThrowError(
      "Direction vector cannot be zero."
    );
  });

  const twoPointsData = [
    {
      p: new Vector2([1, 1]),
      q: new Vector2([2, 2]),
      a: 1,
      b: -1,
      c: 0,
      slope: 1,
      xIntercept: 0,
      yIntercept: 0,
    },
    {
      p: new Vector2([1, 0]),
      q: new Vector2([2, 1]),
      a: 1,
      b: -1,
      c: -1,
      slope: 1,
      xIntercept: 1,
      yIntercept: -1,
    },
    {
      p: new Vector2([-1, 2]),
      q: new Vector2([0, 1]),
      a: -1,
      b: -1,
      c: 1,
      slope: -1,
      xIntercept: 1,
      yIntercept: 1,
    },
    {
      p: new Vector2([1, 1]),
      q: new Vector2([2, 5]),
      a: 4,
      b: -1,
      c: -3,
      slope: 4,
      xIntercept: 0.75,
      yIntercept: -3,
    },
    {
      p: new Vector2([1, 1]),
      q: new Vector2([1, 5]),
      a: 4,
      b: 0,
      c: -4,
      slope: NaN,
      xIntercept: 1,
      yIntercept: null,
    },
    {
      q: new Vector2([1, 1]),
      p: new Vector2([2, 1]),
      a: 0,
      b: 1,
      c: -1,
      slope: 0,
      xIntercept: null,
      yIntercept: 1,
    },
  ];

  it.each(twoPointsData)(
    "creates instance from two points",
    ({ p, q, a, b, c, slope, xIntercept, yIntercept }) => {
      let l: Line2;
      l = Line2.fromPoints(p, q);
      expect(l).toBeInstanceOf(Line2);
      expect(l.a).toBe(a);
      expect(l.b).toBe(b);
      expect(l.c).toBe(c);
      expect(l.slope).toBe(slope);
      expect(l.xIntercept).toBe(xIntercept);
      expect(l.yIntercept).toBe(yIntercept);
    }
  );

  const mediatrixData = [
    {
      p: new Vector2([-1, 1]),
      q: new Vector2([1, -1]),
      a: -2,
      b: 2,
      c: 0,
      slope: 1,
      xIntercept: 0,
      xInterceptPoint: new Vector2([0, 0]),
      yIntercept: 0,
      yInterceptPoint: new Vector2([0, 0]),
    },
    {
      p: new Vector2([-1, -1]),
      q: new Vector2([1, 1]),
      a: -2,
      b: -2,
      c: 0,
      slope: -1,
      xIntercept: 0,
      xInterceptPoint: new Vector2([0, 0]),
      yIntercept: 0,
      yInterceptPoint: new Vector2([0, 0]),
    },
    {
      p: new Vector2([0, 0]),
      q: new Vector2([2, 0]),
      a: -2,
      b: 0,
      c: 2,
      slope: NaN,
      xIntercept: 1,
      xInterceptPoint: new Vector2([1, 0]),
      yIntercept: null,
      yInterceptPoint: null,
    },
    {
      p: new Vector2([0, 0]),
      q: new Vector2([0, 2]),
      a: 0,
      b: -2,
      c: 2,
      slope: 0,
      xIntercept: null,
      xInterceptPoint: null,
      yIntercept: 1,
      yInterceptPoint: new Vector2([0, 1]),
    },
  ];

  it.each(mediatrixData)(
    "retrieves mediatrix from two points",
    ({
      p,
      q,
      a,
      b,
      c,
      slope,
      xIntercept,
      yIntercept,
      xInterceptPoint,
      yInterceptPoint,
    }) => {
      const l = Line2.mediatrix(p, q);
      expect(l).toBeInstanceOf(Line2);
      expect(l.a).toBe(a);
      expect(l.b).toBe(b);
      expect(l.c).toBe(c);
      expect(l.slope).toBe(slope);
      expect(l.xIntercept).toBe(xIntercept);
      expect(l.yIntercept).toBe(yIntercept);
      expect(l.xInterceptPoint).toEqual(xInterceptPoint);
      expect(l.yIntercept).toBe(yIntercept);
      expect(l.yInterceptPoint).toEqual(yInterceptPoint);
    }
  );

  const intersectionPointsData = [
    {
      l1: Line2.fromPoints(new Vector2([0, 2]), new Vector2([2, 0])),
      l2: Line2.fromPoints(new Vector2([-1, -1]), new Vector2([2, 2])),
      x: 1,
      y: 1,
    },
    {
      l1: Line2.fromPoints(new Vector2([0, 2]), new Vector2([2, 0])),
      l2: Line2.fromPoints(new Vector2([1, 0]), new Vector2([1, 3])),
      x: 1,
      y: 1,
    },
    {
      l1: Line2.fromPoints(new Vector2([0, 2]), new Vector2([2, 0])),
      l2: Line2.fromPoints(new Vector2([0, 3]), new Vector2([2, -1])),
      x: 1,
      y: 1,
    },
    {
      l1: Line2.fromPoints(new Vector2([0, 1]), new Vector2([2, 1])),
      l2: Line2.fromPoints(new Vector2([0, 0]), new Vector2([3, 3])),
      x: 1,
      y: 1,
    },
  ];

  it.each(intersectionPointsData)(
    "calculates the intersection point",
    ({ l1, l2, x, y }) => {
      let p = l1.intersectionPoint(l2);
      expect(p.x).toBeCloseTo(x);
      expect(p.y).toBeCloseTo(y);
    }
  );

  it("fails on parallel lines", () => {
    const l1 = new Line2(new Vector2([0, 3]), new Vector2([2, 0]));
    const l2 = new Line2(new Vector2([0, 2]), new Vector2([1, 0]));
    expect(() => l1.intersectionPoint(l2)).toThrowError(
      "Lines are parallel or coincident"
    );
  });

  const containingPointsData = [
    {
      l: Line2.fromPoints(new Vector2([-1, -1]), new Vector2([1, 1])),
      p: new Vector2([2, 2]),
      expected: true,
    },
    {
      l: Line2.fromPoints(new Vector2([-1, -1]), new Vector2([1, 1])),
      p: new Vector2([2, 1]),
      expected: false,
    },
    {
      l: Line2.fromPoints(new Vector2([0, 1]), new Vector2([1, 0])),
      p: new Vector2([1, 0]),
      expected: true,
    },
    {
      l: new Line2(new Vector2([0, 1]), new Vector2([1, -1])),
      p: new Vector2([-1, 2]),
      expected: true,
    },
    {
      l: Line2.fromPoints(new Vector2([0, 1]), new Vector2([1, 0])),
      p: new Vector2([1, 2]),
      expected: false,
    },
  ];

  it.each(containingPointsData)(
    "detects if point is in line",
    ({ l, p, expected }) => {
      expect(l.containsPoint(p)).toBe(expected);
    }
  );

  const distanceToPointData: [Vector2, number][] = [
    [
      new Vector2([0, 3]),
      SQRT1_2 * 3
    ],
    [
      new Vector2([2, 1]),
      SQRT1_2
    ],
    [
      new Vector2([2, 2]),
      0
    ],
  ];

  it.each(distanceToPointData)("calculates distance to point", (p, d) => {
    const line = new Line2(new Vector2([0, 0]), new Vector2([1, 1]));
    expect(line.distanceToPoint(p)).toBeCloseTo(d, 6);
  });

  const pojectionData: [Vector2, Vector2][] = [
    [
      new Vector2([0, 3]),
      new Vector2([1.5, 1.5])
    ],
    [
      new Vector2([4, 2]),
      new Vector2([3, 3])
    ],
    [
      new Vector2([4, 2]),
      new Vector2([3, 3])
    ],
    [
      new Vector2([-7, 1]),
      new Vector2([-3, -3])
    ],
    [
      new Vector2([2, -2]),
      new Vector2([0, 0])
    ],
  ];

  it.each(pojectionData)("calculates projection of point", (p, proj) => {
    const line = new Line2(new Vector2([0, 0]), new Vector2([1, 1]));
    expect(line.projectPoint(p)).toEqual(proj);
  });
});
