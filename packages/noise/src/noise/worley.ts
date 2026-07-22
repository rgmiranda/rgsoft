import { PermutationTable } from "../utils";
import { NoiseBase } from "./noise-base";
import { WorleyDistanceType, WorleyType } from "../types/worley-type.enum";

const WorleyDistanceFunction: Record<
  WorleyDistanceType,
  (...args: number[]) => number
> = {
  [WorleyDistanceType.Euclidean]: (...args: number[]) => {
    const sum = args.reduce((prev, curr) => prev + curr * curr, 0);
    return Math.sqrt(sum);
  },
  [WorleyDistanceType.Manhattan]: (...args) =>
    args.reduce((s, x) => s + Math.abs(x), 0),
  [WorleyDistanceType.Chebyshev]: (...args) => Math.max(...args.map(Math.abs)),
  [WorleyDistanceType.Minkowski]: (...args: number[]) => {
    throw new Error("Function not implemented.");
  },
};

export class Worley extends NoiseBase {
  private readonly permutation: PermutationTable;
  private readonly distance: (...args: number[]) => number;

  constructor(
    seed = "worley",
    private readonly type = WorleyType.F1,
    distance = WorleyDistanceType.Euclidean,
  ) {
    super();
    this.permutation = new PermutationTable(seed);
    this.distance = WorleyDistanceFunction[distance];
  }

  private evaluate1(x: number): [number, number, number] {
    const cell = Math.floor(x);

    let f1 = Infinity;
    let f2 = Infinity;
    let f3 = Infinity;

    for (let i = -1; i <= 1; i++) {
      const h = this.permutation.hash1(x);
      const offset = this.permutation.random01(h);
      const feature = cell + i + offset;
      const dist = this.distance(x - feature);

      if (dist < f1) {
        f3 = f2;
        f2 = f1;
        f1 = dist;
      } else if (dist < f2) {
        f3 = f2;
        f2 = dist;
      } else if (dist < f3) {
        f3 = dist;
      }
    }

    return [f1, f2, f3];
  }

  private evaluate2(x: number, y: number): [number, number, number] {
    const cx = Math.floor(x);
    const cy = Math.floor(y);

    let f1 = Infinity;
    let f2 = Infinity;
    let f3 = Infinity;

    for (let j = -1; j <= 1; j++) {
      for (let i = -1; i <= 1; i++) {
        const h = this.permutation.hash2(x + i, y + j);

        const ox = this.permutation.random01(h, 0);
        const oy = this.permutation.random01(h, 1);

        const fx = cx + i + ox;
        const fy = cy + j + oy;
        const dist = this.distance(x - fx, y - fy);

        if (dist < f1) {
          f3 = f2;
          f2 = f1;
          f1 = dist;
        } else if (dist < f2) {
          f3 = f2;
          f2 = dist;
        } else if (dist < f3) {
          f3 = dist;
        }
      }
    }

    return [f1, f2, f3];
  }

  private evaluate3(x: number, y: number, z: number): [number, number, number] {
    const cx = Math.floor(x);
    const cy = Math.floor(y);
    const cz = Math.floor(z);

    let f1 = Infinity;
    let f2 = Infinity;
    let f3 = Infinity;

    for (let k = -1; k <= 1; k++) {

      for (let j = -1; j <= 1; j++) {

        for (let i = -1; i <= 1; i++) {
          const h = this.permutation.hash3(x + i, y + j, z + k);

          const ox = this.permutation.random01(h, 0);
          const oy = this.permutation.random01(h, 1);
          const oz = this.permutation.random01(h, 2);

          const fx = cx + i + ox;
          const fy = cy + j + oy;
          const fz = cz + k + oz;
          const dist = this.distance(x - fx, y - fy, z - fz);

          if (dist < f1) {
            f3 = f2;
            f2 = f1;
            f1 = dist;
          } else if (dist < f2) {
            f3 = f2;
            f2 = dist;
          } else if (dist < f3) {
            f3 = dist;
          }
        }
      }
    }

    return [f1, f2, f3];
  }

  private evaluate4(x: number, y: number, z: number, w: number): [number, number, number] {
    const cx = Math.floor(x);
    const cy = Math.floor(y);
    const cz = Math.floor(z);
    const cw = Math.floor(w);

    let f1 = Infinity;
    let f2 = Infinity;
    let f3 = Infinity;

    for (let l = -1; l <= 1; l++) {

      for (let k = -1; k <= 1; k++) {

        for (let j = -1; j <= 1; j++) {

          for (let i = -1; i <= 1; i++) {
            const h = this.permutation.hash4(x + i, y + j, z + k, w + l);

            const ox = this.permutation.random01(h, 0);
            const oy = this.permutation.random01(h, 1);
            const oz = this.permutation.random01(h, 2);
            const ow = this.permutation.random01(h, 3);

            const fx = cx + i + ox;
            const fy = cy + j + oy;
            const fz = cz + k + oz;
            const fw = cw + l + ow;
            const dist = this.distance(x - fx, y - fy, z - fz, w - fw);

            if (dist < f1) {
              f3 = f2;
              f2 = f1;
              f1 = dist;
            } else if (dist < f2) {
              f3 = f2;
              f2 = dist;
            } else if (dist < f3) {
              f3 = dist;
            }
          }
        }
      }
    }

    return [f1, f2, f3];
  }

  private select(f1: number, f2: number, f3: number): number {
    switch (this.type) {
      case WorleyType.F1:
        return f1;

      case WorleyType.F2:
        return f2;

      case WorleyType.F3:
        return f3;

      case WorleyType.F2_MINUS_F1:
        return f2 - f1;

      case WorleyType.F3_MINUS_F1:
        return f3 - f1;
    }
  }

  noise1(x: number): number {
    const [f1, f2, f3] = this.evaluate1(x);
    return this.select(f1, f2, f3);
  }
  noise2(x: number, y: number): number {
    const [f1, f2, f3] = this.evaluate2(x, y);
    return this.select(f1, f2, f3);
  }

  noise3(x: number, y: number, z: number): number {
    const [f1, f2, f3] = this.evaluate3(x, y, z);
    return this.select(f1, f2, f3);
  }

  noise4(x: number, y: number, z: number, w: number): number {
    const [f1, f2, f3] = this.evaluate4(x, y, z, w);
    return this.select(f1, f2, f3);
  }
}
