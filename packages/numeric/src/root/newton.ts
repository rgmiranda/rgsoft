import { IterativeResult, ScalarFunction } from "../types";
import { HistoryIteration } from '../types/iterative-result.interface';

const MAX_ITERS = 1000;
const X_TOLERANCE = 1e-4;
const Y_TOLERANCE = 1e-4;

export function newtonRaphson(
  f: ScalarFunction,
  df: ScalarFunction,
  x0: number,
): IterativeResult<number> {
  let y0: number;
  let m: number;
  let x1: number;
  let i = 0;
  let residual: number;
  let positionError: number;

  const history: HistoryIteration[] = [];

  while (i < MAX_ITERS) {
    y0 = f(x0);
    m = df(x0);
    if (m === 0) {
      return {
        value: x0,
        iterations: i + 1,
        residual: Math.abs(y0),
        positionError: Math.abs(x0),
        converged: false,
        history,
      };
    }
    x1 = x0 - y0 / m;
    history.push({
      iteration: i,
      x: x0,
      error: Math.abs(x1 - x0),
    });
    if (y0 === 0) {
      return {
        value: x0,
        iterations: i + 1,
        residual: 0,
        positionError: 0,
        converged: true,
        history,
      };
    }

    positionError = Math.abs(x1 - x0);
    residual = Math.abs(y0);
    if (Math.abs(x0 - x1) <= X_TOLERANCE && Math.abs(y0) <= Y_TOLERANCE) {
      return {
        value: x1,
        iterations: i + 1,
        residual,
        positionError,
        converged: true,
        history,
      };
    }
    x0 = x1;
    y0 = f(x0);
    m = df(x0);
    i++;
  }

  return {
    value: x1!,
    iterations: i + 1,
    residual: residual!,
    positionError: positionError!,
    converged: false,
    history,
  };

}
