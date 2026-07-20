import { describe, expect, it } from "vitest";
import { Worley } from "../../src/noise";
import { WorleyDistanceType, WorleyType } from "../../src/types";

describe(Worley.name, () => {
  it("should be importable through the package entry points", () => {
    const noise = new Worley("seed", WorleyType.F2_MINUS_F1, WorleyDistanceType.Euclidean);

    expect(noise.noise1(0.5)).toBeTypeOf("number");
    expect(noise.noise2(0.25, 0.75)).toBeTypeOf("number");
    expect(noise.noise3(0.1, 0.2, 0.3)).toBeTypeOf("number");
  });

  it("should be deterministic for the same seed and input", () => {
    const noiseA = new Worley("seed");
    const noiseB = new Worley("seed");

    expect(noiseA.noise1(0.5)).toBe(noiseB.noise1(0.5));
    expect(noiseA.noise2(0.25, 0.75)).toBe(noiseB.noise2(0.25, 0.75));
    expect(noiseA.noise3(0.1, 0.2, 0.3)).toBe(noiseB.noise3(0.1, 0.2, 0.3));
  });

  it("should support the available Worley output modes", () => {
    const f1 = new Worley("seed", WorleyType.F1);
    const f2 = new Worley("seed", WorleyType.F2);
    const f3 = new Worley("seed", WorleyType.F3);
    const f2MinusF1 = new Worley("seed", WorleyType.F2_MINUS_F1);
    const f3MinusF1 = new Worley("seed", WorleyType.F3_MINUS_F1);

    expect(f1.noise1(0.5)).toBeGreaterThanOrEqual(0);
    expect(f2.noise1(0.5)).toBeGreaterThanOrEqual(0);
    expect(f3.noise1(0.5)).toBeGreaterThanOrEqual(0);
    expect(f2MinusF1.noise1(0.5)).toBeGreaterThanOrEqual(0);
    expect(f3MinusF1.noise1(0.5)).toBeGreaterThanOrEqual(0);
  });

  it("should support alternative distance metrics", () => {
    const euclidean = new Worley("seed", WorleyType.F1, WorleyDistanceType.Euclidean);
    const manhattan = new Worley("seed", WorleyType.F1, WorleyDistanceType.Manhattan);
    const chebyshev = new Worley("seed", WorleyType.F1, WorleyDistanceType.Chebyshev);

    expect(euclidean.noise2(0.3, 0.8)).not.toBe(manhattan.noise2(0.3, 0.8));
    expect(euclidean.noise2(0.3, 0.8)).not.toBe(chebyshev.noise2(0.3, 0.8));
  });

  it("should throw for unsupported Minkowski distance", () => {
    const noise = new Worley("seed", WorleyType.F1, WorleyDistanceType.Minkowski);

    expect(() => noise.noise2(0.3, 0.8)).toThrow("Function not implemented.");
  });

  it("should cover all branches in evaluate1 with varied inputs", () => {
    const noise = new Worley("seed-coverage");

    // Test with various 1D inputs to ensure all conditional branches are exercised
    const inputs = [0.1, 0.25, 0.5, 0.75, 1.5, 2.3, -0.5, 10.7];
    const results = inputs.map((input) => noise.noise1(input));

    // All results should be valid numbers
    expect(results).toHaveLength(8);
    results.forEach((result) => {
      expect(result).toBeTypeOf("number");
      expect(Number.isFinite(result)).toBe(true);
    });
  });
});
