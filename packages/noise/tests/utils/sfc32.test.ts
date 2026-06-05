import { describe, expect, it } from "vitest";
import { sfc32 } from "../../src/utils";

describe(sfc32.name, () => {
  const testData: [[number, number, number, number], number[]][] = [
    [
      [0xd5e71ed9, 0x97727e9e, 0x741484c3, 0x30b04f63],
      [
        0.6173389465548098, 0.8618584796786308, 0.18602279876358807,
        0.2039393805898726,
      ],
    ],
    [
      [0x85c90e8, 0xe9336dc9, 0x96695f09, 0xe56a365],
      [
        0.9996129325591028, 0.2551717287860811, 0.2570206024684012,
        0.42941880971193314,
      ],
    ],
  ];

  it.each(testData)('should generate random numbers based on given seeds', (seeds, expected) => {
    const randFn = sfc32(...seeds);
    const results = [];
    for (let i = 0; i < expected.length; i++) {
      results.push(randFn());
    }
    expect(results).toEqual(expected);
  });
});
