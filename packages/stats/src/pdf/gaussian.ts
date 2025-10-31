import { TWO_PI } from "@rgsoft/math";
import { erf } from "./erf";
import { PDF } from "./pdf";

export class Gaussian implements PDF {
  public readonly stdDev: number;

  constructor(public readonly mean: number = 0, public readonly variance: number = 1) {
    if (variance <= 0) {
      throw new Error("Variance must be positive");
    }
    this.stdDev = Math.sqrt(variance);
  }

  getAccumulated(x: number): number {
    const z = (x - this.mean) / Math.sqrt(2 * this.variance);
    return 0.5 * (1 + erf(z));
  }

  quantile(p: number): number {
    if (p < 0 || p > 1) {
      throw new Error("Accumulated value must be between 0 and 1");
    }
    if (p === 0) return -Infinity;
    if (p === 1) return Infinity;

    const a = [
      -39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269,
      -30.6647980661472, 2.50662827745924,
    ];
    const b = [
      -54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197,
      -13.2806815528857,
    ];
    const c = [
      -7.78489400243029e-3, -0.322396458041136, -2.40075827716184,
      -2.54973253934373, 4.37466414146497, 2.93816398269878,
    ];
    const d = [
      7.78469570904146e-3, 0.32246712907004, 2.445134137143, 3.75440866190742,
    ];

    let q, r;

    if (p < 0.02425) {
      // Lower region
      q = Math.sqrt(-2 * Math.log(p));
      return (
        (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
      );
    } else if (p > 1 - 0.02425) {
      // Upper region
      q = Math.sqrt(-2 * Math.log(1 - p));
      return (
        -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
        ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
      );
    } else {
      // Central region
      q = p - 0.5;
      r = q * q;
      return (
        ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) *
          q) /
        (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
      );
    }
  }

  getMean(): number {
    return this.mean;
  }

  sample(): number {
    const p = Math.random();
    const z = this.quantile(p);
    return this.mean + z * this.stdDev;
  }

  density(x: number): number {
    const coeff = 1 / (this.stdDev * Math.sqrt(TWO_PI));
    const exponent = -((x - this.mean) ** 2) / (2 * this.stdDev ** 2);
    return coeff * Math.exp(exponent);
  }

  getVariance(): number {
    return this.variance;
  }

  getStdDev(): number {
    return this.stdDev;
  }
}
