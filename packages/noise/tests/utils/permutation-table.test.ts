import { describe, expect, it } from "vitest";
import { PermutationTable } from "../../src/utils";

describe(PermutationTable.name, () => {
  it("should produce deterministic permutations for the same seed", () => {
    const table1 = new PermutationTable("seed-123");
    const table2 = new PermutationTable("seed-123");

    expect(table1.get(0)).toBe(table2.get(0));
    expect(table1.get(42)).toBe(table2.get(42));
    expect(table1.get(255)).toBe(table2.get(255));
  });

  it("should produce different permutations for different seeds", () => {
    const table1 = new PermutationTable("seed-123");
    const table2 = new PermutationTable("seed-456");

    const values = Array.from({ length: 32 }, (_, index) => index).some(
      (index) => table1.get(index) !== table2.get(index),
    );

    expect(values).toBe(true);
  });

  it("should mask coordinates for the hash helpers", () => {
    const table = new PermutationTable("seed-123", 8);

    expect(table.hash1(8)).toBe(table.hash1(0));
    expect(table.hash2(8, 9)).toBe(table.hash2(0, 1));
    expect(table.hash3(8, 9, 10)).toBe(table.hash3(0, 1, 2));
  });

  it("should expose values through get using the same mask", () => {
    const table = new PermutationTable("seed-123", 8);

    expect(table.mask).toBe(7);
    expect(table.get(8)).toBe(table.get(0));
    expect(table.get(-1)).toBe(table.get(7));
  });

  it("should throw when the size is not a power of two", () => {
    expect(() => new PermutationTable("seed-123", 10)).toThrow(
      "Permutation table size must be a power of two.",
    );
  });

  it("should produce deterministic random values within the unit interval", () => {
    const table = new PermutationTable("seed-123", 8);
    const value = table.random01(10, 2);

    expect(value).toBeGreaterThanOrEqual(0);
    expect(value).toBeLessThanOrEqual(1);
    expect(table.random01(10, 2)).toBe(value);
  });
});
