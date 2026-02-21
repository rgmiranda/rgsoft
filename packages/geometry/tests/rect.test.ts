import { beforeAll, describe, expect, it } from "vitest";
import { Circle, Rect } from "../src";
import { Vector2 } from "@rgsoft/linear";

describe(Rect.name, () => {
  let r: Rect;

  beforeAll(() => {
    r = new Rect(new Vector2([0, 0]), 12, 12);
  });

  const boundaryData = [
    { x: 5, y: 5, expected: true },
    { x: 0, y: 0, expected: true },
    { x: 10, y: 10, expected: true },
    { x: 12.1, y: 10, expected: false },
    { x: -0.001, y: 0, expected: false },
  ];

  const intersectionData = [
    {
      rect: new Rect(new Vector2([0, 0]), 12, 12),
      expected: true,
    },
    {
      rect: new Rect(new Vector2([0, 0]), 6, 6),
      expected: true,
    },
    {
      rect: new Rect(new Vector2([2, 2]), 6, 6),
      expected: true,
    },
    {
      rect: new Rect(new Vector2([6, 6]), 12, 12),
      expected: true,
    },
    {
      rect: new Circle(new Vector2([6, 6]), 6),
      expected: true,
    },
    {
      rect: new Circle(new Vector2([18, 18]), 12),
      expected: true,
    },
    {
      rect: new Circle(new Vector2([18, 18]), 8.5),
      expected: true,
    },
    {
      rect: new Circle(new Vector2([18, 18]), 8.4),
      expected: false,
    },
    {
      rect: new Rect(new Vector2([-12, -12]), 6, 6),
      expected: false,
    },
    {
      rect: new Rect(new Vector2([-12, -12]), 12, 12),
      expected: false,
    },
    {
      rect: new Rect(new Vector2([12, 12]), 1, 1),
      expected: false,
    },
  ];

  it("creates an instance", () => {
    expect(r).toBeInstanceOf(Rect);
  });

  it.each(boundaryData)("evaluates boundary", ({ x, y, expected }) => {
    expect(r.contains(new Vector2([ x, y ]))).toBe(expected);
  });

  it("fails on invalid parameters", () => {
    expect(() => new Rect(new Vector2([8, 8]), 8, JSON.parse('"a"'))).toThrowError(
      "Width and height must be numbers",
    );
    expect(() => new Rect(new Vector2([8, 8]), 8, -8)).toThrowError(
      "Width and height must be positive",
    );
  });

  it.each(intersectionData)("evaluates intersection", ({ rect, expected }) => {
    expect(r.intersects(rect)).toBe(expected);
    expect(rect.intersects(r)).toBe(expected);
  });

});
