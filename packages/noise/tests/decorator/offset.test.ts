import { describe, expect, it } from "vitest";
import { Offset } from "../../src";
import { sourceMock } from "./source.mock";

const offset = 0.9;

describe(Offset.name, () => {
  const noise = new Offset(sourceMock, offset);

  const testData: [number, number, number][] = [
    [0.45, -0.0067, 74.0015],
    [0.89, 8.7001, 15],
    [-78.8, 4.001, 3.012],
    [1025.4, -0.002, 0.1],
  ];

  it("updates the range", () => {
    expect(sourceMock.range).toEqual([0, 1]);
    expect(noise.range).toEqual([0.9, 1.9]);
  });

  it.each(testData)("applies the decorator", (x, y, z) => {
    expect(noise.noise1(x)).toBeGreaterThanOrEqual(offset);
    expect(noise.noise2(x, y)).toBeGreaterThanOrEqual(offset);
    expect(noise.noise3(x, y, z)).toBeGreaterThanOrEqual(offset);
  });
});
