/*
 * Quadratic easing functions.
 * @see https://easings.net/#easeInQuad
 * @see https://easings.net/#easeOutQuad
 * @see https://easings.net/#easeInOutQuad
 * License: MIT
 */

export function easeInQuad(x: number): number {
  return x * x;
}

export function easeOutQuad(x: number): number {
  return 1 - (1 - x) * (1 - x);
}

export function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}
