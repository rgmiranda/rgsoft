import { lerp, SQRT1_2 } from "@rgsoft/math";
import { fade } from "./utils";
import { Perlin } from "./perlin";
import { dot } from './utils';

const SQRT1_3 = 1 / Math.sqrt(3);

const gradients: [number, number, number][] = [
  [SQRT1_2, SQRT1_2, 0],
  [SQRT1_2, -SQRT1_2, 0],
  [-SQRT1_2, SQRT1_2, 0],
  [-SQRT1_2, -SQRT1_2, 0],
  [SQRT1_2, 0, SQRT1_2],
  [SQRT1_2, 0, -SQRT1_2],
  [-SQRT1_2, 0, SQRT1_2],
  [-SQRT1_2, 0, -SQRT1_2],
  [0, SQRT1_2, SQRT1_2],
  [0, SQRT1_2, -SQRT1_2],
  [0, -SQRT1_2, SQRT1_2],
  [0, -SQRT1_2, -SQRT1_2],
  [SQRT1_3, SQRT1_3, SQRT1_3],
  [-SQRT1_3, SQRT1_3, SQRT1_3],
  [SQRT1_3, -SQRT1_3, SQRT1_3],
  [-SQRT1_3, -SQRT1_3, SQRT1_3],
  [SQRT1_3, SQRT1_3, -SQRT1_3],
  [-SQRT1_3, SQRT1_3, -SQRT1_3],
  [SQRT1_3, -SQRT1_3, -SQRT1_3],
  [-SQRT1_3, -SQRT1_3, -SQRT1_3],
];
const permSize = 256;

export class Perlin3 extends Perlin {
  constructor(seed = "perlin3") {
    super(seed);
  }

  _noise(x: number, y: number, z: number): number {
    const xp = Math.floor(x) & (permSize - 1);
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const dx0 = x - x0;
    const dx1 = x - x1;

    const yp = Math.floor(y) & (permSize - 1);
    const y0 = Math.floor(y);
    const y1 = y0 + 1;
    const dy0 = y - y0;
    const dy1 = y - y1;

    const zp = Math.floor(z) & (permSize - 1);
    const z0 = Math.floor(z);
    const z1 = z0 + 1;
    const dz0 = z - z0;
    const dz1 = z - z1;

    const a = this.permutation[xp] + yp;
    const b = this.permutation[xp + 1] + yp;

    const aa = this.permutation[a] + zp;
    const ab = this.permutation[a + 1] + zp;
    const ba = this.permutation[b] + zp;
    const bb = this.permutation[b + 1] + zp;

    const aaa = this.permutation[aa];
    const aab = this.permutation[aa + 1];
    const aba = this.permutation[ab];
    const abb = this.permutation[ab + 1];
    const baa = this.permutation[ba];
    const bab = this.permutation[ba + 1];
    const bba = this.permutation[bb];
    const bbb = this.permutation[bb + 1];

    const gAAA = gradients[aaa % gradients.length];
    const gAAB = gradients[aab % gradients.length];
    const gABA = gradients[aba % gradients.length];
    const gABB = gradients[abb % gradients.length];
    const gBAA = gradients[baa % gradients.length];
    const gBAB = gradients[bab % gradients.length];
    const gBBA = gradients[bba % gradients.length];
    const gBBB = gradients[bbb % gradients.length];

    const nAAA = dot(gAAA, [dx0, dy0, dz0]);
    const nAAB = dot(gAAB, [dx0, dy0, dz1]);
    const nABA = dot(gABA, [dx0, dy1, dz0]);
    const nABB = dot(gABB, [dx0, dy1, dz1]);
    const nBAA = dot(gBAA, [dx1, dy0, dz0]);
    const nBAB = dot(gBAB, [dx1, dy0, dz1]);
    const nBBA = dot(gBBA, [dx1, dy1, dz0]);
    const nBBB = dot(gBBB, [dx1, dy1, dz1]);

    const u = fade(dx0);
    const v = fade(dy0);
    const w = fade(dz0);

    const xAA = lerp(nAAA, nBAA, u);
    const xBA = lerp(nABA, nBBA, u);

    const xAB = lerp(nAAB, nBAB, u);
    const xBB = lerp(nABB, nBBB, u);

    const yA = lerp(xAA, xBA, v);
    const yB = lerp(xAB, xBB, v);

    return lerp(yA, yB, w);
  }

  public noise(x: number, y: number, z: number, frequency = 1, amplitude = 1): number {
    return this._noise(x * frequency, y * frequency, z * frequency) * amplitude;
  }
}
