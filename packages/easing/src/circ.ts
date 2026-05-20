/*
 * Circular easing functions.
 * @see https://easings.net/#easeInCirc
 * @see https://easings.net/#easeOutCirc
 * @see https://easings.net/#easeInOutCirc
 * License: MIT
 */

export function easeInCirc(x: number): number {
  return 1 - Math.sqrt(1 - Math.pow(x, 2));
}

export function easeOutCirc(x: number): number {
  return Math.sqrt(1 - Math.pow(x - 1, 2));
}

export function easeInOutCirc(x: number): number {
  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}
