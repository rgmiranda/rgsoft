import { Distribution } from "../distribution";

/**
 * Represents a continuous probability distribution function (PDF).
 * 
 * A PDF defines how the probability density of a continuous random variable
 * is distributed over its domain. This interface provides methods for
 * evaluating the density, cumulative distribution, and sampling values
 * from the distribution.
 *
 * All implementations should ensure that the total integral of the density
 * function over its domain equals 1.
 */
export interface PDF extends Distribution {
  /**
   * Evaluates the probability density function (PDF) at a given value `x`.
   * 
   * @param x - The point at which to evaluate the density.
   * @returns The probability density at `x`.
   * 
   * @example
   * ```ts
   * const gaussian = new Gaussian(0, 1);
   * gaussian.density(0); // ≈ 0.3989
   * ```
   */
  density(x: number): number;

  /**
   * Computes the quantile (inverse CDF) for a given probability `p`.
   * 
   * The quantile function returns the value `x` such that `P(X ≤ x) = p`.
   * Not all distributions have a closed-form quantile function; in such
   * cases, implementations may use a numerical approximation or omit
   * this method.
   * 
   * @param p - The cumulative probability (0 ≤ p ≤ 1).
   * @returns The value `x` such that the cumulative probability equals `p`.
   * 
   * @throws If `p` is outside the range [0, 1].
   * 
   * @example
   * ```ts
   * const gaussian = new Gaussian(0, 1);
   * gaussian.quantile(0.975); // ≈ 1.96
   * ```
   */
  quantile?(p: number): number;
}
