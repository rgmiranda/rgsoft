import { lerp, SQRT1_2 } from "@rgsoft/math";
import { dot, fade, PermutationTable } from "../utils";
import { NoiseBase } from "./noise-base";

const SQRT1_3 = 1 / Math.sqrt(3);

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
const gradients3: [number, number, number][] = [
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

export class Perlin extends NoiseBase {
  protected permutation: PermutationTable;

  constructor(seed = "perlin") {
    super();
    this.permutation = new PermutationTable(seed);
  }

  public noise1(x: number): number {
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const dx0 = x - x0;
    const dx1 = x - x1;
    const g1 = gradients1[this.permutation.hash1(x) % gradients1.length];
    const g2 = gradients1[this.permutation.hash1(x + 1) % gradients1.length];
    const n0 = g1 * dx0;
    const n1 = g2 * dx1;
    const u = fade(dx0);

    return lerp(n0, n1, u);
  }

  public noise2(x: number, y: number): number {
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const dx0 = x - x0;
    const dx1 = x - x1;

    const y0 = Math.floor(y);
    const y1 = y0 + 1;
    const dy0 = y - y0;
    const dy1 = y - y1;

    const aa = this.permutation.hash2(x, y);
    const ab = this.permutation.hash2(x, y + 1);
    const ba = this.permutation.hash2(x + 1, y);
    const bb = this.permutation.hash2(x + 1, y + 1);

    const gAA = gradients2[aa % gradients2.length];
    const gBA = gradients2[ba % gradients2.length];
    const gAB = gradients2[ab % gradients2.length];
    const gBB = gradients2[bb % gradients2.length];

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

  public noise3(x: number, y: number, z: number): number {
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const dx0 = x - x0;
    const dx1 = x - x1;

    const y0 = Math.floor(y);
    const y1 = y0 + 1;
    const dy0 = y - y0;
    const dy1 = y - y1;

    const z0 = Math.floor(z);
    const z1 = z0 + 1;
    const dz0 = z - z0;
    const dz1 = z - z1;

    const aaa = this.permutation.hash3(x, y, z);
    const aab = this.permutation.hash3(x, y, z + 1);
    const aba = this.permutation.hash3(x, y + 1, z);
    const abb = this.permutation.hash3(x, y + 1, z + 1);
    const baa = this.permutation.hash3(x + 1, y, z);
    const bab = this.permutation.hash3(x + 1, y, z + 1);
    const bba = this.permutation.hash3(x + 1, y + 1, z);
    const bbb = this.permutation.hash3(x + 1, y + 1, z + 1);

    const gAAA = gradients3[aaa % gradients3.length];
    const gAAB = gradients3[aab % gradients3.length];
    const gABA = gradients3[aba % gradients3.length];
    const gABB = gradients3[abb % gradients3.length];
    const gBAA = gradients3[baa % gradients3.length];
    const gBAB = gradients3[bab % gradients3.length];
    const gBBA = gradients3[bba % gradients3.length];
    const gBBB = gradients3[bbb % gradients3.length];

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
}
