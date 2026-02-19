import { describe, expect, it } from "vitest";
import { Polygon } from "../src";

describe(Polygon.name, () => {

  it('creates an instance', () => {
    const polygon = new Polygon([], { x: 0, y: 0});
    expect(polygon).toBeInstanceOf(Polygon);
  });

  it('calculates the centroid', () => {
    const polygon = new Polygon([
      { x: 0, y: 0 },
      { x: 0, y: 3 },
      { x: 3, y: 0 },
    ], { x: 0.5, y: 0.5 });

    expect(polygon.centroid).toEqual({ x: 1, y: 1 });
  });

  it('detects a point in the polygon', () => {
    const polygon = new Polygon([
      { x: 0, y: 0 },
      { x: 0, y: 3 },
      { x: 3, y: 0 },
    ], { x: 0.5, y: 0.5 });

    expect(polygon.contains({ x: 1, y: 1})).toBeTruthy();
    expect(polygon.contains({ x: 2, y: 2})).toBeFalsy();
    expect(polygon.contains({ x: 2, y: 1})).toBeFalsy();
    expect(polygon.contains({ x: 1, y: 2})).toBeFalsy();
  });

  it('detects a point on the edge the polygon', () => {
    const polygon = new Polygon([
      { x: 0, y: 0 },
      { x: 0, y: 3 },
      { x: 3, y: 0 },
    ], { x: 0.5, y: 0.5 });

    expect(polygon.isOnEdge({ x: 0, y: 0 })).toBeTruthy();
    expect(polygon.isOnEdge({ x: 2, y: 1 })).toBeTruthy();
    expect(polygon.isOnEdge({ x: 1, y: 2 })).toBeTruthy();
    expect(polygon.isOnEdge({ x: 0, y: 0 })).toBeTruthy();
    expect(polygon.isOnEdge({ x: 1, y: 1 })).toBeFalsy();
    expect(polygon.isOnEdge({ x: 2, y: 2 })).toBeFalsy();
  });

  it('detects a point on the edge or contained by the polygon', () => {
    const polygon = new Polygon([
      { x: 0, y: 0},
      { x: 0, y: 3},
      { x: 3, y: 0},
    ], { x: 0.5, y: 0.5 });

    expect(polygon.containsOrOnEdge({ x: 0, y: 0 })).toBeTruthy();
    expect(polygon.containsOrOnEdge({ x: 2, y: 1 })).toBeTruthy();
    expect(polygon.containsOrOnEdge({ x: 1, y: 2 })).toBeTruthy();
    expect(polygon.containsOrOnEdge({ x: 0, y: 0 })).toBeTruthy();
    expect(polygon.containsOrOnEdge({ x: 1, y: 1 })).toBeTruthy();
    expect(polygon.containsOrOnEdge({ x: 2, y: 2 })).toBeFalsy();
  });
});
