import { describe, expect, it } from "vitest";
import { DomainWarp, Noise } from "../../src/noise";
import { Range } from "../../src/types";

class ConstantNoise implements Noise {
  public readonly range: Range = [0, 1];

  constructor(private readonly value: number) {}

  noise1(): number {
    return this.value;
  }

  noise2(): number {
    return this.value;
  }

  noise3(): number {
    return this.value;
  }
}

describe(DomainWarp.name, () => {
  it("should forward the source range", () => {
    const source: Noise = {
      range: [-5, 5],
      noise1: () => 0,
      noise2: () => 0,
      noise3: () => 0,
    };
    const warp = new ConstantNoise(0.5);

    const noise = new DomainWarp(source, warp);

    expect(noise.range).toEqual([-5, 5]);
  });

  it("should apply warp offsets to noise1 using the default strength", () => {
    const source: Noise = {
      range: [0, 1] as const,
      noise1: (x) => x,
      noise2: () => 0,
      noise3: () => 0,
    };
    const warp: Noise = {
      range: [0, 1] as const,
      noise1: () => 0.5,
      noise2: () => 0,
      noise3: () => 0,
    };
    const noise = new DomainWarp(source, warp);

    expect(noise.noise1(1)).toBe(1 + 0.5 * 20);
    expect(noise.noise1(-2)).toBe(-2 + 0.5 * 20);
  });

  it("should apply warp offsets to noise2 and noise3 with a custom strength", () => {
    const source: Noise = {
      range: [0, 1] as const,
      noise1: () => 0,
      noise2: (x, y) => x + y,
      noise3: (x, y, z) => x + y + z,
    };
    const warp: Noise = {
      range: [0, 1] as const,
      noise1: () => 0.5,
      noise2: () => 0.5,
      noise3: () => 0.5,
    };
    const noise = new DomainWarp(source, warp, { strength: 10 });

    expect(noise.noise2(1, 2)).toBe(1 + 2 + (0.5 + 0.5) * 10);
    expect(noise.noise3(1, 2, 3)).toBe(1 + 2 + 3 + (0.5 + 0.5 + 0.5) * 10);
  });
});
