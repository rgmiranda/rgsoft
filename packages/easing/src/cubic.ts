/*
 * Quadratic easing functions.
 * @see https://easings.net/#easeInCubic
 * @see https://easings.net/#easeOutCubic
 * @see https://easings.net/#easeInOutCubic
 * License: MIT
 */

export function easeInCubic(x: number): number {
  return x * x * x;
}

export function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

export function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}
