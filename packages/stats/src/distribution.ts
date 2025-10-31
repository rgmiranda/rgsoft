export interface Distribution {
  /** Cumulative distribution function: P(X ≤ x) */
  getAccumulated(x: number): number;

  /** Expected value (mean) of the distribution */
  getMean(): number;

  /** Returns the variance if applicable */
  getVariance?(): number;

  /** Returns the standard deviation if applicable */
  getStdDev?(): number;

  /** Generate a random value following this distribution */
  sample(): number;
}
