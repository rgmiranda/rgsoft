import { combination } from "@rgsoft/math";
import { PMF } from "./pmf";

export class Binomial implements PMF {
  private readonly probabilities: number[];
  private readonly accumulative: number[];
  private readonly variance: number;
  private readonly stdDev: number;

  constructor(private readonly n: number, private readonly p: number) {
    if (!Number.isInteger(n) || n < 1) {
      throw new Error("The number of experiments must be a positive integer");
    }

    if (!(p >= 0 && p <= 1)) {
      throw new Error("The success probability must be between 0 and 1");
    }

    this.variance = n * p * (1  - p);
    this.stdDev = Math.sqrt(this.variance);
    this.probabilities = Array(n + 1)
      .fill(0)
      .map((_, i: number) => combination(n, i) * p ** i * (1 - p) ** (n - i));
    let acc = 0;
    this.accumulative = this.probabilities.map((p) => {
      acc += p;
      return acc;
    });
  }

  getAccumulated(x: number): number {
    x = Math.floor(x);
    if (isNaN(x)) {
      throw new Error("Number expected");
    }
    if (x < 0) {
      return 0;
    }
    if (x > this.n) {
      return 1;
    }

    return this.accumulative[x];
  }

  sample(): number {
    const rnd = Math.random();
    return this.accumulative.findIndex((acc) => rnd < acc);
  }

  getMean(): number {
    return this.n * this.p;
  }

  getVariance(): number {
    return this.variance;
  }

  getStdDev(): number {
    return this.stdDev;
  }

  probability(x: number): number {
    if (!Number.isInteger(x) || x < 0) {
      throw new Error("The value must be a positive integer");
    }
    if (x > this.n) {
      throw new Error("The value cannot ve larger than the experiments number");
    }
    return this.probabilities[x];
  }
}
