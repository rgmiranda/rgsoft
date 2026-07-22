import { describe, expect, it } from "vitest";
import { Noise } from "../src/noise";
import { Range } from "../src/types";

class TestNoise implements Noise {
  public readonly range: Range = [0, 1];

  public noise1(): number {
    return 0;
  }

  public noise2(): number {
    return 0;
  }

  public noise3(): number {
    return 0;
  }

  public noise4(): number {
    return 0;
  }
}

describe("exports", () => {
  it("should allow importing Noise from src/noise", () => {
    const noise = new TestNoise();
    expect(noise.range).toEqual([0, 1]);
    expect(noise.noise1(0)).toBe(0);
    expect(noise.noise2(0, 0)).toBe(0);
    expect(noise.noise3(0, 0, 0)).toBe(0);
    expect(noise.noise4(0, 0, 0, 0)).toBe(0);
  });

  it("should allow importing Range from src/types", () => {
    const range: Range = [0, 1];
    expect(range).toEqual([0, 1]);
  });
});
