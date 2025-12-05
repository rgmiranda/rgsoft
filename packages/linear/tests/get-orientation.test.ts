import { describe, expect, it } from "vitest";
import { getOrientation, Vector2 } from "../src";

describe("getOrientation", () => {

  const testData = [
    {
      p: new Vector2([1, 1]),
      q: new Vector2([2, 2]),
      r: new Vector2([3, 3]),
      expected: 0 // collinear
    },
    {
      p: new Vector2([1, 1]),
      q: new Vector2([2, 2]),
      r: new Vector2([3, 1]),
      expected: -1 // clockwise
    },
    {
      p: new Vector2([1, 1]),
      q: new Vector2([2, 2]),
      r: new Vector2([1, 3]),
      expected: 1 // counter-clockwise
    },
  ];

  it.each(testData)('detect orientation of three points', ({ p, q, r, expected }) => {
    const result = getOrientation(p, q, r);
    expect(result).toBe(expected);
  });

});
