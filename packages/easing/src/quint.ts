/*
 * Fifth power easing functions.
 * @see https://easings.net/#easeInQuint
 * @see https://easings.net/#easeOutQuint
 * @see https://easings.net/#easeInOutQuint
 * License: MIT
 */

export function easeInQuint(x: number): number {
  return x * x * x * x * x;
}

export function easeOutQuint(x: number): number {
  return 1 - Math.pow(1 - x, 5);
}

export function easeInOutQuint(x: number): number {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}
