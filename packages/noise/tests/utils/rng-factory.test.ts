import { describe, expect, it } from "vitest";
import { rngFactory } from "../../src/utils";

describe(rngFactory.name, () => {
  it("should produce deterministic sequences for the same seed", () => {
    const rand1 = rngFactory("seed-123");
    const rand2 = rngFactory("seed-123");

    const sequence1 = [rand1(), rand1(), rand1(), rand1()];
    const sequence2 = [rand2(), rand2(), rand2(), rand2()];

    expect(sequence1).toEqual(sequence2);
  });

  it("should produce different sequences for different seeds", () => {
    const rand1 = rngFactory("seed-123");
    const rand2 = rngFactory("seed-456");

    const sequence1 = [rand1(), rand1(), rand1(), rand1()];
    const sequence2 = [rand2(), rand2(), rand2(), rand2()];

    expect(sequence1).not.toEqual(sequence2);
  });
});
