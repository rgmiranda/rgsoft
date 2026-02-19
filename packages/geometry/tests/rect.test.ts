import { beforeAll, describe, expect, it } from "vitest";
import { Area, Circle, Point, Rect } from "../src";

describe(Rect.name, () => {
  let r: Rect;

  beforeAll(() => {
    r = new Rect(0, 0, 12, 12);
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
      rect: new Rect(0, 0, 12, 12),
      expected: true,
    },
    {
      rect: new Rect(0, 0, 6, 6),
      expected: true,
    },
    {
      rect: new Rect(2, 2, 6, 6),
      expected: true,
    },
    {
      rect: new Rect(6, 6, 12, 12),
      expected: true,
    },
    {
      rect: new Circle(6, 6, 6),
      expected: true,
    },
    {
      rect: new Circle(18, 18, 12),
      expected: true,
    },
    {
      rect: new Circle(18, 18, 8.5),
      expected: true,
    },
    {
      rect: new Circle(18, 18, 8.4),
      expected: false,
    },
    {
      rect: new Rect(-12, -12, 6, 6),
      expected: false,
    },
    {
      rect: new Rect(-12, -12, 12, 12),
      expected: false,
    },
    {
      rect: new Rect(12, 12, 1, 1),
      expected: false,
    },
  ];

  it("creates an instance", () => {
    expect(r).toBeInstanceOf(Rect);
  });

  it("fails on invalid parameters", () => {
    expect(() => new Rect(JSON.parse('"a"'), 8, 8, 8)).toThrowError(
      "x and y coordinates must be numbers",
    );
    expect(() => new Rect(8, 8, 8, JSON.parse('"a"'))).toThrowError(
      "Width and height must be numbers",
    );
    expect(() => new Rect(8, 8, 8, -8)).toThrowError(
      "Width and height must be positive",
    );
  });

  it.each(boundaryData)("evaluates boundary", ({ x, y, expected }) => {
    expect(r.contains({ x, y })).toBe(expected);
  });

  it.each(intersectionData)("evaluates intersection", ({ rect, expected }) => {
    expect(r.intersects(rect)).toBe(expected);
    expect(rect.intersects(r)).toBe(expected);
  });

  it("fails on unrecognized area type", () => {
      class MyArea implements Area {
        contains(p: Point): boolean {
          throw new Error("Method not implemented.");
        }
        intersects(area: Area): boolean {
          throw new Error("Method not implemented.");
        }
      }

      const a = new MyArea();
      expect(() => r.intersects(a)).toThrowError("Unrecognized area type");
    });
});
