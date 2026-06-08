export function dot(a: number[], b: number[]): number {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new Error("Both arguments must be arrays");
  }
  if (a.length !== b.length) {
    throw new Error("Vectors must be of the same length");
  }
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += a[i] * b[i];
  }
  return sum;
}
