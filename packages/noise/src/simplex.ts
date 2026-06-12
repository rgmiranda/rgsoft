import { lerp, range, SQRT1_2 } from "@rgsoft/math";
import { Noise } from "./noise";
import { fade, sfc32, shuffle, xmur3 } from "./utils";
import { dot } from "./utils/dot";

const permSize = 256;
const gradients1 = [1, -1];
const gradients2: [number, number][] = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-SQRT1_2, -SQRT1_2],
  [SQRT1_2, -SQRT1_2],
  [-SQRT1_2, SQRT1_2],
  [SQRT1_2, SQRT1_2],
];

const F2 = (Math.sqrt(3) - 1) / 2;
const G2 = (3 - Math.sqrt(3)) / 6;
const F3 = 1 / 3;
const G3 = 1 / 6;

export class Simplex extends Noise {
  protected permutation: Uint8Array;

  constructor(seed = "simplex") {
    super();
    const seeder = xmur3(seed);
    const rng = sfc32(seeder(), seeder(), seeder(), seeder());
    let perms = shuffle(range(0, permSize), rng);
    perms = perms.concat(perms);
    this.permutation = new Uint8Array(perms);
  }

  public noise1(x: number): number {
    const xp = Math.floor(x) & (permSize - 1);
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const dx0 = x - x0;
    const dx1 = x - x1;
    const g1 = gradients1[this.permutation[xp] % gradients1.length];
    const g2 = gradients1[this.permutation[xp + 1] % gradients1.length];
    const n0 = g1 * dx0;
    const n1 = g2 * dx1;
    const u = fade(dx0);

    return lerp(n0, n1, u);
  }

  public noise2(x: number, y: number): number {
    const s = (x + y) * F2;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const ii = i & (permSize - 1);
    const jj = j & (permSize - 1);

    const t = (i + j) * G2;
    const ox = i - t;
    const oy = j - t;

    const x0 = x - ox;
    const y0 = y - oy;

    let i1, j1;

    if (x0 > y0) {
      [i1, j1] = [1, 0];
    } else {
      [i1, j1] = [0, 1];
    }

    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;

    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;

    const hash0 = this.permutation[ii + this.permutation[jj]];
    const hash1 = this.permutation[ii + i1 + this.permutation[jj + j1]];
    const hash2 = this.permutation[ii + 1 + this.permutation[jj + 1]];

    const grad0 = gradients2[this.permutation[hash0] % gradients2.length];
    const grad1 = gradients2[this.permutation[hash1] % gradients2.length];
    const grad2 = gradients2[this.permutation[hash2] % gradients2.length];

    const dot0 = dot(grad0, [x0, y0]);
    const dot1 = dot(grad1, [x1, y1]);
    const dot2 = dot(grad2, [x2, y2]);

    let t0 = 0.5 - x0 * x0 - y0 * y0;
    let n0 = 0;
    if (t0 >= 0) {
      t0 *= t0;
      n0 = t0 * t0 * dot0;
    } else {
      n0 = 0;
    }

    let t1 = 0.5 - x1 * x1 - y1 * y1;
    let n1 = 0;
    if (t1 >= 0) {
      t1 *= t1;
      n1 = t1 * t1 * dot1;
    } else {
      n1 = 0;
    }

    let t2 = 0.5 - x2 * x2 - y2 * y2;
    let n2 = 0;
    if (t2 >= 0) {
      t2 *= t2;
      n2 = t2 * t2 * dot2;
    } else {
      n2 = 0;
    }

    return 70 * (n0 + n1 + n2);
  }

  public noise3(x: number, y: number, z: number): number {
    return 0;
  }
}
