import { EPSILON } from "@rgsoft/math";
import { HistoryIteration, IterativeResult, ScalarFunction } from "../types";

const MAX_ITER = 1000;
const X_TOLERANCE = EPSILON;
const Y_TOLERANCE = EPSILON;

export function secant(
  f: ScalarFunction,
  x0: number,
  x1: number,
): IterativeResult<number> {
  let fx0: number;
  let fx1: number;
  let x2: number;

  let iterations = 1;
  let converged = false;
  let positionError: number;
  let residual: number;
  const history: HistoryIteration[] = [];

  do {
    fx0 = f(x0);
    fx1 = f(x1);
    positionError = Math.abs(x1 - x0) * 0.5
    residual = Math.abs(fx1);
    history.push({
      error: positionError,
      iteration: iterations - 1,
      x: x1,
    });

    if (Math.abs(fx0) === 0 || Math.abs(fx1) === 0) {
      converged = true;
      return {
        converged,
        iterations,
        positionError: 0,
        residual: 0,
        history,
        value: Math.abs(fx1) === 0 ? x1 : x0,
      }
    }

    if (!Number.isFinite(fx0) || !Number.isFinite(fx1)) {
      return {
        converged: false,
        iterations,
        positionError,
        residual,
        history,
        value: x1,
      }
    }

    if (positionError <= X_TOLERANCE && residual <= Y_TOLERANCE) {
      converged = true;
      return {
        converged,
        iterations,
        positionError,
        residual,
        history,
        value: x1
      }
    }

    if (Math.abs(fx1 - fx0) === 0) {
      converged = false;
      return {
        converged,
        iterations,
        positionError,
        residual,
        history,
        value: x1
      }
    }

    x2 = x1 - fx1 * (x1 - x0) / (fx1 - fx0);
    x0 = x1;
    x1 = x2;
    iterations++;
  } while (iterations <= MAX_ITER);

  converged = false;
  return {
    converged,
    iterations: iterations - 1,
    positionError,
    residual,
    history,
    value: x1,
  };
}
