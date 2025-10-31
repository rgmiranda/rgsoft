import { PDF } from "./pdf";

export class Exponential implements PDF {
  private readonly lambda: number;

  constructor(private readonly mean: number) {
    if (mean <= 0) {
      throw new Error("Mean must be greater than zero");
    }
    this.lambda = 1 / mean;
  }

  getAccumulated(x: number): number {
    if (x < 0) {
      return 0;
    }
    return 1 - Math.exp(-this.lambda * x);
  }

  sample(): number {
    const p = Math.min(Math.random(), 1 - Number.EPSILON);
    return -1 * Math.log(1 - p) * this.mean;
  }

  getMean(): number {
    return this.mean;
  }

  density(x: number): number {
    if (x < 0) {
      return 0;
    }
    return this.lambda * Math.exp(-this.lambda * x);
  }

  getVariance(): number {
    return this.mean ** 2;
  }

  getStdDev(): number {
    return this.mean;
  }

  quantile(p: number): number {
    return -Math.log(1 - p) * this.mean;
  }
}
