/*
 * Exponential easing functions.
 * @see https://easings.net/#easeInExpo
 * @see https://easings.net/#easeOutExpo
 * @see https://easings.net/#easeInOutExpo
 * License: MIT
 */

export function easeInExpo(x: number): number {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

export function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export function easeInOutExpo(x: number): number {
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  if (x < 0.5) {
    return Math.pow(2, 20 * x - 10) / 2;
  }
  return (2 - Math.pow(2, -20 * x + 10)) / 2;
}
