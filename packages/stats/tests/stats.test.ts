import { beforeAll, describe, expect, it } from "vitest";
import { Stats } from "../src";

describe(Stats.name, () => {

  const data = [64, 23, 87, 11, 78, 34, 100, 0, 53];
  let stats: Stats;

  beforeAll(() => {
    stats = new Stats(data);
  })

  it('creates an instance', () => {
    expect(stats).toBeInstanceOf(Stats);
  });

  it('calculates the mean', () => {
    expect(stats.mean).toBe(50);
  });

  it('retrieves the quartiles', () => {
    expect(stats.q1).toBe(23);
    expect(stats.q2).toBe(53);
    expect(stats.median).toBe(53);
    expect(stats.q3).toBe(78);
  });

  it('normalizes the original data', () => {
    expect(stats.normalized).toEqual(data.map(x => x / 100));
  });

  it('calculates the z-scores', () => {
    const sd = stats.stdDev;
    const m = stats.mean;
    expect(stats.zScores).toEqual(data.map(x => (x - m) / sd));
  });

  it('fails with empty array', () => {
    expect(() => new Stats([])).toThrowError();
  });
});