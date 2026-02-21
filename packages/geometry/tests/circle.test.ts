import { beforeAll, describe, expect, it } from "vitest";
import { Circle, Rect } from "../src";
import { Vector2 } from "@rgsoft/linear";

describe(Circle.name, () => {
  let r: Circle;

  beforeAll(() => {
    r = new Circle(new Vector2([0, 0]), 12);
  });

  const boundaryData = [
    { x: 5, y: 5, expected: true },
    { x: 0, y: 0, expected: true },
    { x: 8.48, y: 8.48, expected: true },
    { x: -6, y: 0, expected: true },
    { x: 12.1, y: 10, expected: false },
    { x: 8.49, y: 8.49, expected: false },
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
      rect: new Circle(new Vector2([6, 6]), 12),
      expected: true,
    },
    {
      rect: new Circle(new Vector2([18, 18]), 8.5),
      expected: false,
    },
    {
      rect: new Circle(new Vector2([18, 18]), 8.4),
      expected: false,
    },
    {
      rect: new Rect(new Vector2([-15, -15]), 1, 1),
      expected: false,
    },
    {
      rect: new Rect(new Vector2([-14, 0]), 1, 1),
      expected: false,
    },
    {
      rect: new Rect(new Vector2([0, -15]), 1, 1),
      expected: false,
    },
  ];

  it("creates an instance", () => {
    expect(r).toBeInstanceOf(Circle);
  });

  it("fails on invalid parameters", () => {
    expect(() => new Circle(new Vector2([-3, -5.1]), JSON.parse('"a"'))).toThrowError('Radius must be a positive number');
    expect(() => new Circle(new Vector2([-3, -5.1]), -89)).toThrowError('Radius must be a positive number');
  });

  it.each(boundaryData)("evaluates boundary", ({ x, y, expected }) => {
    expect(r.contains(new Vector2([x, y]))).toBe(expected);
  });

  it.each(intersectionData)("evaluates intersection", ({ rect, expected }) => {
    expect(r.intersects(rect)).toBe(expected);
    expect(rect.intersects(r)).toBe(expected);
  });

});
