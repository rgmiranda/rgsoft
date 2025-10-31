/**
 * Calculates the factorial of a positive integer
 * @param { number } n Number to calculate from
 * @param { number } m (Optional) Number to calculate to
 * @returns { number }
 */
export function factorial(n: number, m: number = NaN): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("The number must be a positive integer");
  }

  if (isNaN(m)) {
    m = 1;
  } else {
    if (!Number.isInteger(m) || m < 0) {
      throw new Error("The lower limit must be a positive integer");
    }
    if (n < m) {
      throw new Error("The lower limit cannot be higher than the number");
    }
  }

  if (n === 0 || n === m - 1) {
    return 1;
  }

  let f = 1;
  while (n >= m) {
    f *= n;
    n--;
  }
  return f;
}

/**
 * Calculates the combination of n taking by k.
 * @param { number } n
 * @param { number } k
 * @returns { number }
 */
export function combination(n: number, k: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("The number of elements must be a positive integer");
  }
  if (!Number.isInteger(k) || k < 0) {
    throw new Error("The group quantity must be a positive integer");
  }
  if (k > n) {
    throw new Error(
      "The group quantity cannot be greater than the total elements"
    );
  }
  if (k === 0 || k === n) {
    return 1;
  }
  return (
    factorial(n, Math.max(k + 1, n - k + 1)) / factorial(Math.min(k, n - k))
  );
}

/**
 * Calculates the permutation of n taking by k.
 * @param { number } n
 * @param { number } k
 * @returns { number }
 */
export function permutation(n: number, k: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error("The number of elements must be a positive integer");
  }
  if (!Number.isInteger(k) || k < 0) {
    throw new Error("The group quantity must be a positive integer");
  }
  if (k > n) {
    throw new Error(
      "The group quantity cannot be greater than the total elements"
    );
  }
  if (k === 0) {
    return 1;
  }
  return factorial(n, n - k + 1);
}
