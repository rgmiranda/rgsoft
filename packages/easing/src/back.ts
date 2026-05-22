/*
 * Back functions for easing animations.
 *
 * @see https://easings.net/#easeInBack
 * @see https://easings.net/#easeOutBack
 * @see https://easings.net/#easeInOutBack
 */

const c1 = 1.70158;
const c2 = c1 * 1.525;
const c3 = c1 + 1;

export function easeInBack(x: number): number {
  return c3 * x * x * x - c1 * x * x;
}

export function easeOutBack(x: number): number {
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

export function easeInOutBack(x: number): number {
  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
}
