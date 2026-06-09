import { lerp, SQRT1_2 } from "@rgsoft/math";
import { fade } from "./utils";
import { Perlin } from "./perlin";
import { dot } from './utils';

const gradients = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-SQRT1_2, -SQRT1_2],
  [SQRT1_2, -SQRT1_2],
  [-SQRT1_2, SQRT1_2],
  [SQRT1_2, SQRT1_2],
];
const permSize = 256;

export class Perlin2 extends Perlin {
  constructor(seed = "perlin2") {
    super(seed);
  }

  _noise(x: number, y: number): number {
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

    const aa = this.permutation[this.permutation[xp] + yp];
    const ab = this.permutation[this.permutation[xp] + yp + 1];
    const ba = this.permutation[this.permutation[xp + 1] + yp];
    const bb = this.permutation[this.permutation[xp + 1] + yp + 1];

    const gAA = gradients[aa % gradients.length];
    const gBA = gradients[ba % gradients.length];
    const gAB = gradients[ab % gradients.length];
    const gBB = gradients[bb % gradients.length];

    const nAA = dot(gAA, [dx0, dy0]);
    const nAB = dot(gAB, [dx0, dy1]);
    const nBA = dot(gBA, [dx1, dy0]);
    const nBB = dot(gBB, [dx1, dy1]);

    const u = fade(dx0);
    const v = fade(dy0);
    const ix0 = lerp(nAA, nBA, u);
    const ix1 = lerp(nAB, nBB, u);
    return lerp(ix0, ix1, v);
  }

  public noise(x: number, y: number, frequency = 1, amplitude = 1): number {
    return this._noise(x * frequency, y * frequency) * amplitude;
  }
}
