/*
 * Elastic functions for easing animations.
 *
 * @see https://easings.net/#easeInElastic
 * @see https://easings.net/#easeOutElastic
 * @see https://easings.net/#easeInOutElastic
 */

const c4 = (2 * Math.PI) / 3;
const c5 = (2 * Math.PI) / 4.5;

export function easeInElastic(x: number): number {
  return x === 0
    ? 0
    : x === 1
      ? 1
      : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
}

export function easeOutElastic(x: number): number {
  return x === 0
    ? 0
    : x === 1
      ? 1
      : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
}

export function easeInOutElastic(x: number): number {
  if (x === 0) {
    return 0;
  }
  if (x === 1) {
    return 1;
  }
  return x < 0.5
    ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
    : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
}
