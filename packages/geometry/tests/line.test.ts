import { describe, expect, it } from "vitest";
import { Line } from "../src/line";
import { Vector2 } from "@rgsoft/linear";

describe(Line.name, () => {
  it("creates a new instance", () => {
    const l = new Line(1, 1, 2);
    expect(l).toBeInstanceOf(Line);
    expect(l.toString()).toBe('1x + 1y + 2 = 0');
  });

  const twoPointsData = [
    {
      p: new Vector2([1, 1]),
      q: new Vector2([2, 2]),
      a: -1,
      b: 1,
      c: 0,
      slope: 1,
      xIntercept: 0,
      yIntercept: 0,
    },
    {
      p: new Vector2([1, 0]),
      q: new Vector2([2, 1]),
      a: -1,
      b: 1,
      c: 1,
      slope: 1,
      xIntercept: 1,
      yIntercept: -1,
    },
    {
      p: new Vector2([-1, 2]),
      q: new Vector2([0, 1]),
      a: 1,
      b: 1,
      c: -1,
      slope: -1,
      xIntercept: 1,
      yIntercept: 1,
    },
    {
      p: new Vector2([1, 1]),
      q: new Vector2([2, 5]),
      a: -4,
      b: 1,
      c: 3,
      slope: 4,
      xIntercept: 0.75,
      yIntercept: -3,
    },
    {
      p: new Vector2([1, 1]),
      q: new Vector2([1, 5]),
      a: -4,
      b: 0,
      c: 4,
      slope: NaN,
      xIntercept: 1,
      yIntercept: null,
    },
    {
      q: new Vector2([1, 1]),
      p: new Vector2([2, 1]),
      a: 0,
      b: -1,
      c: 1,
      slope: 0,
      xIntercept: null,
      yIntercept: 1,
    },
  ];

  it.each(twoPointsData)(
    "creates instance from two points",
    ({ p, q, a, b, c, slope, xIntercept, yIntercept }) => {
      let l: Line;
      l = Line.fromPoints(p, q);
      expect(l).toBeInstanceOf(Line);
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
      yIntercept: 0,
    },
    {
      p: new Vector2([-1, -1]),
      q: new Vector2([1, 1]),
      a: -2,
      b: -2,
      c: 0,
      slope: -1,
      xIntercept: 0,
      yIntercept: 0,
    },
    {
      p: new Vector2([0, 0]),
      q: new Vector2([2, 0]),
      a: -2,
      b: 0,
      c: 2,
      slope: NaN,
      xIntercept: 1,
      yIntercept: null,
    },
    {
      p: new Vector2([0, 0]),
      q: new Vector2([0, 2]),
      a: 0,
      b: -2,
      c: 2,
      slope: 0,
      xIntercept: null,
      yIntercept: 1,
    },
  ];

  it.each(mediatrixData)(
    "retrieves mediatrix from two points",
    ({ p, q, a, b, c, slope, xIntercept, yIntercept }) => {
      const l = Line.mediatrix(p, q);
      expect(l).toBeInstanceOf(Line);
      expect(l.a).toBe(a);
      expect(l.b).toBe(b);
      expect(l.c).toBe(c);
      expect(l.slope).toBe(slope);
      expect(l.xIntercept).toBe(xIntercept);
      expect(l.yIntercept).toBe(yIntercept);
    }
  );

  const intersectionPointsData = [
    {
      l1: new Line(1, -1, 0),
      l2: new Line(1, 1, -2),
      x: 1,
      y: 1
    },
    {
      l1: new Line(1, 0, -1),
      l2: new Line(1, 1, -2),
      x: 1,
      y: 1
    },
    {
      l1: new Line(1, 0, -1),
      l2: new Line(1, -1, 0),
      x: 1,
      y: 1
    },
    {
      l1: new Line(1, 0, -1),
      l2: new Line(0, 1, -1),
      x: 1,
      y: 1
    },
  ];

  it.each(intersectionPointsData)('calculates the intersection point', ({ l1, l2, x, y }) => {
    let p = l1.intersectionPoint(l2);
    expect(p.x).toBe(x);
    expect(p.y).toBe(y);
  });

  it('fails on parallel lines', () => {
    const l1 = new Line(1, -1, 3);
    const l2 = new Line(2, -2, 6);
    expect(() => l1.intersectionPoint(l2)).toThrowError(
      'Lines are parallel or coincident'
    );
  });

  const containingPointsData = [
    {
      l: new Line(1, -1, 0),
      p: new Vector2([2, 2]),
      expected: true,
    },
    {
      l: new Line(1, -1, 0),
      p: new Vector2([2, 1]),
      expected: false,
    },
    {
      l: new Line(1, 1, -1),
      p: new Vector2([1, 0]),
      expected: true,
    },
    {
      l: new Line(1, 1, -1),
      p: new Vector2([-1, 2]),
      expected: true,
    },
    {
      l: new Line(1, 1, -1),
      p: new Vector2([1, 2]),
      expected: false,
    },
  ];

  it.each(containingPointsData)('detects if point is in line', ({l, p, expected}) => {
    expect(l.containsPoint(p)).toBe(expected);
  });

});
