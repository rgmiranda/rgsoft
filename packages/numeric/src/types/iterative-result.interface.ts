export interface HistoryIteration {
  iteration: number;
  x: number;
  error: number;
}

export interface IterativeResult<T> {
  value: T;
  iterations: number;
  residual: number;
  positionError: number;
  converged: boolean;
  history: HistoryIteration[];
}
