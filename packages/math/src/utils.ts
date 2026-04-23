import { EPSILON } from "./constants";

/**
 * Generates an array of numbers from a `start` (inclusively) to an `end`
 * (exclusively), using a `step`
 *
 * @param { number } start
 * @param { number } end
 * @param { number } step
 * @returns { number[] }
 */
export function range(start: number, end: number, step: number = 1): number[] {
  if (start === end) {
    throw new Error("Invalid range");
  }

  if (start < end && step <= 0) {
    throw new Error("Invalid range");
  }

  if (start > end && step >= 0) {
    throw new Error("Invalid range");
  }

  const a = [];
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      a.push(i);
    }
  } else {
    for (let i = start; i > end; i += step) {
      a.push(i);
    }
  }
  return a;
}

export function lerp(start: number, stop: number, amount: number): number {
  if (amount < 0 || amount > 1) {
    throw new Error('Amount must be between 0 and 1');
  }
  return start + ( stop - start ) * amount;
}

export function clamp(value: number, lowerBound: number, upperBound: number): number {
  if (lowerBound > upperBound) {
    throw new Error('Lower bound must be lower than upper bound');
  }
  return Math.max(Math.min(value, upperBound), lowerBound);
}

export function approximateTo(n: number, target = 0, epsilon = EPSILON): number {
  return Math.abs(n - target) < epsilon ? target : n;
}

export function areClose(n: number, m: number, epsilon = EPSILON): boolean {
  return Math.abs(n - m) < epsilon;
}

export function isCloseToZero(n: number, epsilon = EPSILON): boolean {
  return Math.abs(n) < epsilon;
}

export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin: number,
  outputMax: number,
  clampValue: boolean = false,
): number {
  if (inputMin === inputMax) {
    throw new Error("Invalid range recieved");
  }
  const p = (value - inputMin) / (inputMax - inputMin);
  let outputVal = outputMin + p * (outputMax - outputMin);
  if (clampValue) {
    outputVal = clamp(outputVal, outputMin, outputMax);
  }
  return outputVal;
}
