export function erf(z: number): number {
  const t = 1 / (1 + 0.5 * Math.abs(z));
  const tau =
    t *
    Math.exp(
      -z * z -
        1.26551223 +
        1.00002368 * t +
        0.37409196 * t ** 2 +
        0.09678418 * t ** 3 -
        0.18628806 * t ** 4 +
        0.27886807 * t ** 5 -
        1.13520398 * t ** 6 +
        1.48851587 * t ** 7 -
        0.82215223 * t ** 8 +
        0.17087277 * t ** 9
    );

  return z >= 0 ? 1 - tau : tau - 1;
}
