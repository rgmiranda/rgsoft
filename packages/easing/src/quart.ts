/*
 * Fourth power easing functions.
 * @see https://easings.net/#easeInQuart
 * @see https://easings.net/#easeOutQuart
 * @see https://easings.net/#easeInOutQuart
 * License: MIT
 */

export function easeInQuart(x: number): number {
  return x * x * x * x;
}

export function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

export function easeInOutQuart(x: number): number {
return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
}
