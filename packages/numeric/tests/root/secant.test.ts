import { describe, expect, it } from "vitest";
import { IterativeResult, secant } from "../../src";
describe(secant.name, () => {
  const rootsTestData: [
    (x: number) => number,
    number,
    number,
    Partial<IterativeResult<number>>,
  ][] = [
    [
      (x) => (0.5 * x - 3) * (0.5 * x - 3) * (0.5 * x - 3) + 1,
      4,
      7,
      {
        converged: true,
        iterations: 1,
        positionError: 0,
        residual: 0,
        value: 4,
        history: [
          {
            error: 1.5,
            iteration: 0,
            x: 7,
          },
        ],
      },
    ],
    [
      (x) => (0.5 * x - 3) * (0.5 * x - 3) * (0.5 * x - 3) + 1,
      3,
      4,
      {
        converged: true,
        iterations: 1,
        positionError: 0,
        residual: 0,
        value: 4,
        history: [
          {
            error: 0.5,
            iteration: 0,
            x: 4,
          },
        ],
      },
    ],
    [
      (x) => (0.5 * x - 3) * (0.5 * x - 3) * (0.5 * x - 3) + 1,
      3,
      4,
      {
        converged: true,
        iterations: 1,
        positionError: 0,
        residual: 0,
        value: 4,
        history: [
          {
            error: 0.5,
            iteration: 0,
            x: 4,
          },
        ],
      },
    ],
    [
      (x) => (0.5 * x - 3) * (0.5 * x - 3) * (0.5 * x - 3) + 1,
      3,
      5,
      {
        converged: true,
        iterations: 10,
        positionError: 0,
        residual: 0,
        value: 4,
        history: [
          {
            error: 1,
            iteration: 0,
            x: 5,
          },
          {
            error: 0.5 * (5 - 4.461538461538462),
            iteration: 1,
            x: 4.461538461538462,
          },
          {
            error: 0.44427948408648077,
            iteration: 2,
            x: 3.5729794933655,
          },
          {
            error: 0.2625344641558953,
            iteration: 3,
            x: 4.098048421677291,
          },
          {
            error: 0.03964346960271481,
            iteration: 4,
            x: 4.018761482471861,
          },
          {
            error: 0.009859141853137743,
            iteration: 5,
            x: 3.9990431987655857,
          },
          {
            error: 0.0004829151160299361,
            iteration: 6,
            x: 4.0000090289976455,
          },
          {
            error: 0.000004512339765838647,
            iteration: 7,
            x: 4.000000004318114,
          },
          {
            error: 2.1590667032000965e-9,
            iteration: 8,
            x: 3.9999999999999805,
          },
          {
            error: 0,
            iteration: 9,
            x: 4,
          },
        ],
      },
    ],
  ];

  it.each(rootsTestData)("returns roots from functions", (f, x0, x1, e) => {
    const r = secant(f, x0, x1);

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

  it("converges for a linear function", () => {
    const result = secant((x) => x - 3, 0, 10);

    expect(result).toMatchObject({
      converged: true,
      iterations: 2,
      positionError: 0,
      residual: 0,
      value: 3,
    });
  });

  it("reports failure when the secant denominator is zero", () => {
    const result = secant(() => 1, 0, 10);

    expect(result).toMatchObject({
      converged: false,
      iterations: 1,
      value: 10,
      residual: 1,
    });
  });

  it("reports failure when an evaluation is non-finite", () => {
    const result = secant((x) => 1 / (x - 1), 0, 2);

    expect(result.converged).toBe(false);
    expect(result.value).toBe(1);
    expect(result.residual).toBe(Infinity);
    expect(result.history).toHaveLength(2);
  });

  it("accepts an exact root at the current estimate", () => {
    const result = secant((x) => (x === 0 ? 0 : Number.NaN), -1, 0);

    expect(result).toMatchObject({
      converged: true,
      value: 0,
      residual: 0,
    });
  });

  it("prefers an exact root over a non-finite other estimate", () => {
    const result = secant((x) => (x === 0 ? 0 : Number.NaN), 0, 1);

    expect(result).toMatchObject({
      converged: true,
      value: 0,
      residual: 0,
    });
  });
});
