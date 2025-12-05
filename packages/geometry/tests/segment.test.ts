import { describe, expect, it } from "vitest";
import { Segment } from "../src";
import { Vector2 } from "@rgsoft/linear";

describe(Segment.name, () => {
  it("creates an instance", () => {
    const s = new Segment(new Vector2([0, 0]), new Vector2([1, 1]));
    expect(s).toBeInstanceOf(Segment);
  });

  it("detects a point on a segment", () => {
    const s = new Segment(new Vector2([-1, 1]), new Vector2([1, -1]));
    expect(s).toBeInstanceOf(Segment);

    expect(s.contains(new Vector2([0, 0]))).toBe(true);
    expect(s.contains(new Vector2([0.5, 0]))).toBe(false);
  });

  const segmentsIntersections = [
    [
      new Segment(new Vector2([1, 1]), new Vector2([-1, -1])),
      new Segment(new Vector2([-1, 1]), new Vector2([1, -1])),
      true,
    ],
    [
      new Segment(new Vector2([1, 1]), new Vector2([-1, -1])),
      new Segment(new Vector2([-1, 1]), new Vector2([0, 0])),
      true,
    ],
    [
      new Segment(new Vector2([1, 1]), new Vector2([-1, -1])),
      new Segment(new Vector2([-1, 1]), new Vector2([-1, -1])),
      true,
    ],
    [
      new Segment(new Vector2([0, 1]), new Vector2([-1, 0])),
      new Segment(new Vector2([0, 1]), new Vector2([1, 0])),
      true,
    ],
    [
      new Segment(new Vector2([-1, 0]), new Vector2([0, 1])),
      new Segment(new Vector2([0, 1]), new Vector2([1, 0])),
      true,
    ],
    [
      new Segment(new Vector2([0, -1]), new Vector2([-1, 0])),
      new Segment(new Vector2([0, -1]), new Vector2([1, 0])),
      true,
    ],
    [
      new Segment(new Vector2([-1, 0]), new Vector2([0, -1])),
      new Segment(new Vector2([0, -1]), new Vector2([1, 0])),
      true,
    ],
    [
      new Segment(new Vector2([1, 1]), new Vector2([-1, -1])),
      new Segment(new Vector2([-1, 1]), new Vector2([-0.5, 0.5])),
      false,
    ],
    [
      new Segment(new Vector2([1, 1]), new Vector2([-1, -1])),
      new Segment(new Vector2([-1, 1]), new Vector2([-1, 0])),
      false,
    ],
  ];

  it.each(segmentsIntersections)(
    "detects if intersects another segment",
    (s1: any, s2: any, expected: any) => {
      expect(s1.intersects(s2)).toBe(expected);
    }
  );

  it("calculates midpoint", () => {
    const s = new Segment(new Vector2([0, 0]), new Vector2([2, 1]));
    expect(s.midpoint.x).toBe(1);
    expect(s.midpoint.y).toBe(0.5);
  });

  it("calculates lenght", () => {
    const s = new Segment(new Vector2([1, 1]), new Vector2([5, 4]));
    expect(s.length).toBe(5);
  });

  it("calculates direction", () => {
    const s = new Segment(new Vector2([1, 0]), new Vector2([1, -1]));
    expect(s.direction.x).toBe(0);
    expect(s.direction.y).toBe(-1);
  });
});
