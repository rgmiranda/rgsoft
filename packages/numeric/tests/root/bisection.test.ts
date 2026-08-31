import { describe, expect, it } from "vitest";
import { bisection, IterativeResult } from "../../src";
describe(bisection.name, () => {
  const rootsTestData: [
    (x: number) => number,
    number,
    number,
    Partial<IterativeResult<number>>,
  ][] = [
    [
      (x) => x - 1,
      0.75,
      1.75,
      {
        converged: true,
        iterations: 2,
        positionError: 0,
        residual: 0,
        value: 1,
        history: [
          {
            error: 0.5,
            iteration: 0,
            x: 1.25,
          },
          {
            error: 0,
            iteration: 1,
            x: 1,
          },
        ],
      },
    ],
    [
      (x) => x - 1,
      0.5,
      1.5,
      {
        converged: true,
        iterations: 1,
        positionError: 0,
        residual: 0,
        value: 1,
        history: [
          {
            error: 0,
            iteration: 0,
            x: 1,
          },
        ],
      },
    ],
  ];

  it.each(rootsTestData)("returns roots from functions", (f, a, b, e) => {
    const r = bisection(f, a, b);
    expect(r).toEqual(e);
  });
});
