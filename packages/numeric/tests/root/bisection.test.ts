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

    expect(r.converged).toBe(e.converged);
    expect(r.iterations).toBe(e.iterations);
    if (typeof e.value === "number") {
      expect(r.value).toBeCloseTo(e.value, 10);
    }
    if (typeof e.positionError === "number") {
      expect(r.positionError).toBeCloseTo(e.positionError, 10);
    }
    if (typeof e.residual === "number") {
      expect(r.residual).toBeCloseTo(e.residual, 10);
    }

    if (e.history) {
      expect(r.history).toHaveLength(e.history.length);
      e.history.forEach((expected, index) => {
        expect(r.history[index].iteration).toBe(expected.iteration);
        expect(r.history[index].x).toBeCloseTo(expected.x, 10);
        expect(r.history[index].error).toBeCloseTo(expected.error, 10);
      });
    }
  });
});
