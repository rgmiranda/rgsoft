import { PDF } from "./pdf";

export class Uniform implements PDF {
  private readonly diff: number;

  constructor(public readonly min: number, public readonly max: number) {
    if (min >= max) {
      throw new Error("Min must be lower than max");
    }
    this.diff = max - min;
  }

  getAccumulated(x: number): number {
    if (x < this.min) {
      return 0;
    }

    if (x > this.max) {
      return 1;
    }

    return (x - this.min) / this.diff;
  }

  getMean(): number {
    return (this.max + this.min) * 0.5;
  }

  sample(): number {
    return Math.random() * this.diff + this.min;
  }

  density(x: number): number {
    if (x < this.min || x > this.max) {
      return 0;
    }
    return 1 / this.diff;
  }

  getVariance(): number {
    return this.diff ** 2 / 12;
  }

  getStdDev(): number {
    return this.diff / Math.sqrt(12);
  }

  quantile(p: number): number {
    return this.min + p * (this.max - this.min);
  }
}
