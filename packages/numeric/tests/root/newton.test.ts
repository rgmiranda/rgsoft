import { describe, expect, it } from "vitest";
import { newtonRaphson, IterativeResult } from "../../src";
describe(newtonRaphson.name, () => {
  const rootsTestData: [
    (x: number) => number,
    (x: number) => number,
    number,
    Partial<IterativeResult<number>>,
  ][] = [
    [
      (x) => (0.5 * x - 3) * (0.5 * x - 3) * (0.5 * x - 3) + 1,
      (x) => 1.5 * (0.5 * x - 3) * (0.5 * x - 3),
      4,
      {
        converged: true,
        iterations: 1,
        positionError: 0,
        residual: 0,
        value: 4,
        history: [
          {
            error: 0,
            iteration: 0,
            x: 4,
          },
        ],
      },
    ],
    [
      (x) => (0.5 * x - 3) * (0.5 * x - 3) * (0.5 * x - 3) + 1,
      (x) => 1.5 * (0.5 * x - 3) * (0.5 * x - 3),
      3,
      {
        converged: true,
        iterations: 5,
        positionError: 2.1334574373810256e-7,
        residual: 3.2001868355280294e-7,
        value: 3.9999999999999774,
        history: [
          {
            error: 0.7037037037037037,
            iteration: 0,
            x: 3,
          },
          {
            error: 0.2597088937706351,
            iteration: 1,
            x: 3.7037037037037037,
          },
          {
            error: 0.03593404397735567,
            iteration: 2,
            x: 3.963412597474339,
          },
          {
            error: 0.0006531452025391182,
            iteration: 3,
            x: 3.9993466414516945,
          },
          {
            error: 2.1334574373810256e-7,
            iteration: 4,
            x: 3.9999997866542336,
          },
        ],
      },
    ],
    [
      (x) => (0.5 * x - 3) * (0.5 * x - 3) * (0.5 * x - 3) + 1,
      (x) => 1.5 * (0.5 * x - 3) * (0.5 * x - 3),
      5,
      {
        converged: true,
        iterations: 6,
        positionError: 0.00000491166344174232,
        residual: 0.000007367531349666834,
        value: 3.9999999999879376,
        history: [
          {
            error: 2.3333333333333335,
            iteration: 0,
            x: 5,
          },
          {
            error: 0.8711111111111114,
            iteration: 1,
            x: 2.6666666666666665,
          },
          {
            error: 0.3808809745506432,
            iteration: 2,
            x: 3.537777777777778,
          },
          {
            error: 0.07820374853029177,
            iteration: 3,
            x: 3.918658752328421,
          },
          {
            error: 0.0031325874657830433,
            iteration: 4,
            x: 3.996862500858713,
          },
          {
            error: 0.00000491166344174232,
            iteration: 5,
            x: 3.999995088324496,
          },
        ],
      },
    ],
    [
      (x) => (0.5 * x - 3) * (0.5 * x - 3) * (0.5 * x - 3) + 1,
      (x) => 1.5 * (0.5 * x - 3) * (0.5 * x - 3),
      6,
      {
        converged: false,
        iterations: 1,
        positionError: 6,
        residual: 1,
        value: 6,
        history: [],
      },
    ],
  ];

  it.each(rootsTestData)("returns roots from functions", (f, df, b, e) => {
    const r = newtonRaphson(f, df, b);

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
