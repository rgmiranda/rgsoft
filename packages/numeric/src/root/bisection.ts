import { HistoryIteration, IterativeResult, ScalarFunction } from "../types";

const MAX_ITER = 1000;
const X_TOLERANCE = 1e-4;
const Y_TOLERANCE = 1e-4;

export function bisection(
  f: ScalarFunction,
  a: number,
  b: number,
): IterativeResult<number> {
  let fa = f(a);
  let fb = f(b);
  if (!Number.isFinite(fa)) {
    throw new Error("f(a) is not defined");
  }
  if (!Number.isFinite(fb)) {
    throw new Error("f(b) is not defined");
  }

  if (Math.abs(fa) === 0) {
    return {
      converged: true,
      value: a,
      iterations: 0,
      positionError: 0,
      residual: 0,
      history: [
        {
          x: a,
          error: 0,
          iteration: 0,
        }
      ],
    };
  }
  if (Math.abs(fb) === 0) {
    return {
      converged: true,
      value: b,
      iterations: 0,
      positionError: 0,
      residual: 0,
      history: [
        {
          x: b,
          error: 0,
          iteration: 0,
        },
      ],
    };
  }

  if (fa * fb > 0) {
    throw new Error("f(a) and f(b) do not have opposite signs");
  }

  let m = a + (b - a) * 0.5;
  let fm = f(m);
  let iterations = 1;
  let converged = false;
  let positionError = Math.abs(b - a) * 0.5;
  let residual = Math.abs(fm);
  const history: HistoryIteration[] = [];

  if (!Number.isFinite(fm)) {
    history.push({
      x: m,
      error: Math.abs(b - a) * 0.5,
      iteration: iterations - 1,
    });
    return {
      converged,
      iterations,
      positionError,
      residual,
      history,
      value: m
    };
  }
  if (Math.abs(fm) === 0) {
    history.push({
      x: m,
      error: 0,
      iteration: iterations - 1,
    });
    converged = true;
    return {
      converged,
      iterations,
      positionError: 0,
      residual,
      history,
      value: m
    };
  }

  while (
    (positionError > X_TOLERANCE || residual > Y_TOLERANCE) &&
    iterations < MAX_ITER
  ) {
    history.push({
      error: positionError,
      iteration: iterations - 1,
      x: m,
    });

    if (fm * fa > 0) {
      a = m;
      fa = fm;
    } else {
      b = m;
      fb = fm;
    }
    m = a + (b - a) * 0.5;
    fm = f(m);
    residual = Math.abs(fm);
    positionError = Math.abs(b - a) * 0.5;
    iterations++;

    if (!Number.isFinite(fm)) {
      history.push({
        x: m,
        error: Math.abs(b - a) * 0.5,
        iteration: iterations - 1,
      });
      return {
        converged,
        iterations,
        positionError,
        residual,
        history,
        value: m,
      };
    }

    if (Math.abs(fm) === 0) {
      history.push({
        x: m,
        error: 0,
        iteration: iterations - 1,
      });
      converged = true;
      return {
        converged,
        iterations,
        positionError: 0,
        residual,
        history,
        value: m,
      };
    }
  }

  history.push({
    x: m,
    error: Math.abs(b - a) * 0.5,
    iteration: iterations - 1,
  });

  if (positionError <= X_TOLERANCE && residual <= Y_TOLERANCE) {
    converged = true;
    return {
      converged,
      iterations,
      positionError,
      residual,
      history,
      value: m,
    };
  }

  return {
    converged,
    iterations,
    positionError,
    residual,
    history,
    value: fm,
  };;
}
