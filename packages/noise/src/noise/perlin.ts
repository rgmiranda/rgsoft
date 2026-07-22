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

const gradients4: [number, number, number, number][] = [
  [SQRT1_2, SQRT1_2, 0, 0],
  [SQRT1_2, -SQRT1_2, 0, 0],
  [-SQRT1_2, SQRT1_2, 0, 0],
  [-SQRT1_2, -SQRT1_2, 0, 0],

  [SQRT1_2, 0, SQRT1_2, 0],
  [SQRT1_2, 0, -SQRT1_2, 0],
  [-SQRT1_2, 0, SQRT1_2, 0],
  [-SQRT1_2, 0, -SQRT1_2, 0],

  [SQRT1_2, 0, 0, SQRT1_2],
  [SQRT1_2, 0, 0, -SQRT1_2],
  [-SQRT1_2, 0, 0, SQRT1_2],
  [-SQRT1_2, 0, 0, -SQRT1_2],

  [0, SQRT1_2, 0, SQRT1_2],
  [0, SQRT1_2, 0, -SQRT1_2],
  [0, -SQRT1_2, 0, SQRT1_2],
  [0, -SQRT1_2, 0, -SQRT1_2],

  [0, 0, SQRT1_2, SQRT1_2],
  [0, 0, SQRT1_2, -SQRT1_2],
  [0, 0, -SQRT1_2, SQRT1_2],
  [0, 0, -SQRT1_2, -SQRT1_2],

  [SQRT1_3, SQRT1_3, SQRT1_3, 0],
  [-SQRT1_3, SQRT1_3, SQRT1_3, 0],
  [SQRT1_3, -SQRT1_3, SQRT1_3, 0],
  [-SQRT1_3, -SQRT1_3, SQRT1_3, 0],

  [SQRT1_3, SQRT1_3, 0, -SQRT1_3],
  [-SQRT1_3, SQRT1_3, 0, -SQRT1_3],
  [SQRT1_3, -SQRT1_3, 0, -SQRT1_3],
  [-SQRT1_3, -SQRT1_3, 0, -SQRT1_3],

  [SQRT1_3, 0, SQRT1_3, -SQRT1_3],
  [-SQRT1_3, 0, SQRT1_3, -SQRT1_3],
  [SQRT1_3, 0, -SQRT1_3, -SQRT1_3],
  [-SQRT1_3, 0, -SQRT1_3, -SQRT1_3],

  [0, SQRT1_3, SQRT1_3, -SQRT1_3],
  [0, -SQRT1_3, SQRT1_3, -SQRT1_3],
  [0, SQRT1_3, -SQRT1_3, -SQRT1_3],
  [0, -SQRT1_3, -SQRT1_3, -SQRT1_3],

  [0.5, 0.5, 0.5, 0.5],
  [0.5, 0.5, 0.5, -0.5],
  [0.5, 0.5, -0.5, 0.5],
  [0.5, 0.5, -0.5, -0.5],
  [0.5, -0.5, 0.5, 0.5],
  [0.5, -0.5, 0.5, -0.5],
  [0.5, -0.5, -0.5, 0.5],
  [0.5, -0.5, -0.5, -0.5],
  [-0.5, 0.5, 0.5, 0.5],
  [-0.5, 0.5, 0.5, -0.5],
  [-0.5, 0.5, -0.5, 0.5],
  [-0.5, 0.5, -0.5, -0.5],
  [-0.5, -0.5, 0.5, 0.5],
  [-0.5, -0.5, 0.5, -0.5],
  [-0.5, -0.5, -0.5, 0.5],
  [-0.5, -0.5, -0.5, -0.5],
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

  public noise4(x: number, y: number, z: number, w: number): number {
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

    const w0 = Math.floor(w);
    const w1 = w0 + 1;
    const dw0 = w - w0;
    const dw1 = w - w1;

    const aaaa = this.permutation.hash4(x, y, z, w);
    const aaab = this.permutation.hash4(x, y, z, w + 1);
    const aaba = this.permutation.hash4(x, y, z + 1, w);
    const aabb = this.permutation.hash4(x, y, z + 1, w + 1);
    const abaa = this.permutation.hash4(x, y + 1, z, w);
    const abab = this.permutation.hash4(x, y + 1, z, w + 1);
    const abba = this.permutation.hash4(x, y + 1, z + 1, w);
    const abbb = this.permutation.hash4(x, y + 1, z + 1, w + 1);
    const baaa = this.permutation.hash4(x + 1, y, z, w);
    const baab = this.permutation.hash4(x + 1, y, z, w + 1);
    const baba = this.permutation.hash4(x + 1, y, z + 1, w);
    const babb = this.permutation.hash4(x + 1, y, z + 1, w + 1);
    const bbaa = this.permutation.hash4(x + 1, y + 1, z, w);
    const bbab = this.permutation.hash4(x + 1, y + 1, z, w + 1);
    const bbba = this.permutation.hash4(x + 1, y + 1, z + 1, w);
    const bbbb = this.permutation.hash4(x + 1, y + 1, z + 1, w + 1);

    const gAAAA = gradients4[aaaa % gradients4.length];
    const gAAAB = gradients4[aaab % gradients4.length];
    const gAABA = gradients4[aaba % gradients4.length];
    const gAABB = gradients4[aabb % gradients4.length];
    const gABAA = gradients4[abaa % gradients4.length];
    const gABAB = gradients4[abab % gradients4.length];
    const gABBA = gradients4[abba % gradients4.length];
    const gABBB = gradients4[abbb % gradients4.length];
    const gBAAA = gradients4[baaa % gradients4.length];
    const gBAAB = gradients4[baab % gradients4.length];
    const gBABA = gradients4[baba % gradients4.length];
    const gBABB = gradients4[babb % gradients4.length];
    const gBBAA = gradients4[bbaa % gradients4.length];
    const gBBAB = gradients4[bbab % gradients4.length];
    const gBBBA = gradients4[bbba % gradients4.length];
    const gBBBB = gradients4[bbbb % gradients4.length];

    const nAAAA = dot(gAAAA, [dx0, dy0, dz0, dw0]);
    const nAAAB = dot(gAAAB, [dx0, dy0, dz0, dw1]);
    const nAABA = dot(gAABA, [dx0, dy0, dz1, dw0]);
    const nAABB = dot(gAABB, [dx0, dy0, dz1, dw1]);
    const nABAA = dot(gABAA, [dx0, dy1, dz0, dw0]);
    const nABAB = dot(gABAB, [dx0, dy1, dz0, dw1]);
    const nABBA = dot(gABBA, [dx0, dy1, dz1, dw0]);
    const nABBB = dot(gABBB, [dx0, dy1, dz1, dw1]);
    const nBAAA = dot(gBAAA, [dx1, dy0, dz0, dw0]);
    const nBAAB = dot(gBAAB, [dx1, dy0, dz0, dw1]);
    const nBABA = dot(gBABA, [dx1, dy0, dz1, dw0]);
    const nBABB = dot(gBABB, [dx1, dy0, dz1, dw1]);
    const nBBAA = dot(gBBAA, [dx1, dy1, dz0, dw0]);
    const nBBAB = dot(gBBAB, [dx1, dy1, dz0, dw1]);
    const nBBBA = dot(gBBBA, [dx1, dy1, dz1, dw0]);
    const nBBBB = dot(gBBBB, [dx1, dy1, dz1, dw1]);

    const ux = fade(dx0);
    const uy = fade(dy0);
    const uz = fade(dz0);
    const uw = fade(dw0);

    const xAAA = lerp(nAAAA, nBAAA, ux);
    const xBAA = lerp(nABAA, nBBAA, ux);

    const xABA = lerp(nAABA, nBABA, ux);
    const xBBA = lerp(nABBA, nBBBA, ux);

    const xAAB = lerp(nAAAB, nBAAB, ux);
    const xBAB = lerp(nABAB, nBBAB, ux);

    const xABB = lerp(nAABB, nBABB, ux);
    const xBBB = lerp(nABBB, nBBBB, ux);

    const yAA = lerp(xAAA, xBAA, uy);
    const yBA = lerp(xABA, xBBA, uy);

    const yAB = lerp(xAAB, xBAB, uy);
    const yBB = lerp(xABB, xBBB, uy);

    const zA = lerp(yAA, yBA, uz);
    const zB = lerp(yAB, yBB, uz);

    return lerp(zA, zB, uw);
  }
}
