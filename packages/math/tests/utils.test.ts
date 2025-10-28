import { describe, expect, it } from "vitest";
import { clamp, lerp, range } from "../src";

describe('Utils', () => {
  describe(range.name, () => {
    const fromBaseData: {
      params: [number, number, number];
      expected: number[];
    }[] = [
      {
        params: [0, 5, 1],
        expected: [0, 1, 2, 3, 4],
      },
      {
        params: [5, 0, -1],
        expected: [5, 4, 3, 2, 1],
      },
      {
        params: [-5, 0, 1],
        expected: [-5, -4, -3, -2, -1],
      },
      {
        params: [3, -3, -1],
        expected: [3, 2, 1, 0, -1, -2],
      },
      {
        params: [3, -3, -2],
        expected: [3, 1, -1],
      },
      {
        params: [0, 5, 4],
        expected: [0, 4],
      },
      {
        params: [0, 5, 5],
        expected: [0],
      },
    ];

    it.each(fromBaseData)("generates the range", ({ params, expected }) => {
      const result = range(...params);
      expect(result).toEqual(expected);
    });

    const invalidRanges: [number, number, number][] = [
      [0, 10, -1],
      [0, 0, 1],
      [10, -10, 1],
    ];

    it.each(invalidRanges)("fails on invalid range", (start, end, step) => {
      expect(() => range(start, end, step)).toThrowError("Invalid range");
    });
  });

  describe(lerp.name, () => {
    const testData = [
      [0, 1, 0.5, 0.5],
      [0, 10, 0.5, 5],
      [50, 100, 0.5, 75],
      [-50, 50, 0.5, 0],
      [-50, 50, 0.75, 25],
      [100, 0, 0.75, 25],
    ];

    it.each(testData)('applies lerp', (start, stop, amount, expected) => {
      expect(lerp(start, stop, amount)).toBe(expected);
    });

    it('fails on invalid amount', () => {
      expect(() => lerp(0, 10, -0.1)).toThrowError('Amount must be between 0 and 1');
      expect(() => lerp(0, 10, 2.5)).toThrowError('Amount must be between 0 and 1');
    });

  });

  describe(clamp.name, () => {
    const testData = [
      [0, 0, 10, 0],
      [10, 0, 10, 10],
      [-8, 0, 10, 0],
      [55, 0, 10, 10],
    ];

    it.each(testData)('clamps values', (lowerBound, upperBound, value, expected) => {
      expect(clamp(lowerBound, upperBound, value)).toBe(expected);
    });

    it('fails on invalid range', () => {
      expect(() => clamp(20, 10, 0)).toThrowError(
        "Lower bound must be lower than upper bound"
      );
    });

  });

});
