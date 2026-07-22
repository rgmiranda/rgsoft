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

const F2 = (Math.sqrt(3) - 1) / 2;
const G2 = (3 - Math.sqrt(3)) / 6;

const F3 = 1 / 3;
const G3 = 1 / 6;

const F4 = (Math.sqrt(5) - 1) / 4;
const G4 = (5 - Math.sqrt(5)) / 20;

export class Simplex extends NoiseBase {
  protected permutation: PermutationTable;

  constructor(seed = "simplex") {
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
    const s = (x + y) * F2;
    const i = Math.floor(x + s);
    const j = Math.floor(y + s);

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

    const hash0 = this.permutation.hash2(i, j);
    const hash1 = this.permutation.hash2(i + i1, j + j1);
    const hash2 = this.permutation.hash2(i + 1, j + 1);

    const grad0 = gradients2[hash0 % gradients2.length];
    const grad1 = gradients2[hash1 % gradients2.length];
    const grad2 = gradients2[hash2 % gradients2.length];

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

  private contribution3(
    grad: [number, number, number],
    x: number,
    y: number,
    z: number,
  ): number {
    let t = 0.6 - x * x - y * y - z * z;
    if (t <= 0) {
      return 0;
    }
    t *= t;

    return t * t * dot(grad, [x, y, z]);
  }

  public noise3(x: number, y: number, z: number): number {
    const s = (x + y + z) * F3;

    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const k = Math.floor(z + s);

    const t = (i + j + k) * G3;
    const ox = i - t;
    const oy = j - t;
    const oz = k - t;

    const x0 = x - ox;
    const y0 = y - oy;
    const z0 = z - oz;

    let rankx = 0;
    let ranky = 0;
    let rankz = 0;

    if (x0 > y0) rankx++;
    else ranky++;

    if (x0 > z0) rankx++;
    else rankz++;

    if (y0 > z0) ranky++;
    else rankz++;

    const i1 = rankx >= 2 ? 1 : 0;
    const j1 = ranky >= 2 ? 1 : 0;
    const k1 = rankz >= 2 ? 1 : 0;

    const i2 = rankx >= 1 ? 1 : 0;
    const j2 = ranky >= 1 ? 1 : 0;
    const k2 = rankz >= 1 ? 1 : 0;

    const x1 = x0 - i1 + G3;
    const y1 = y0 - j1 + G3;
    const z1 = z0 - k1 + G3;

    const x2 = x0 - i2 + 2 * G3;
    const y2 = y0 - j2 + 2 * G3;
    const z2 = z0 - k2 + 2 * G3;

    const x3 = x0 - 1 + 3 * G3;
    const y3 = y0 - 1 + 3 * G3;
    const z3 = z0 - 1 + 3 * G3;

    const hash0 = this.permutation.hash3(i, j, k);
    const hash1 = this.permutation.hash3(i + i1, j + j1, k + k1);
    const hash2 = this.permutation.hash3(i + i2, j + j2, k + k2);
    const hash3 = this.permutation.hash3(i + 1, j + 1, k + 1);

    const grad0 = gradients3[hash0 % gradients3.length];
    const grad1 = gradients3[hash1 % gradients3.length];
    const grad2 = gradients3[hash2 % gradients3.length];
    const grad3 = gradients3[hash3 % gradients3.length];

    let n0 = this.contribution3(grad0, x0, y0, z0);
    let n1 = this.contribution3(grad1, x1, y1, z1);
    let n2 = this.contribution3(grad2, x2, y2, z2);
    let n3 = this.contribution3(grad3, x3, y3, z3);
    return 32 * (n0 + n1 + n2 + n3);
  }

  private contribution4(
    grad: [number, number, number, number],
    x: number,
    y: number,
    z: number,
    w: number,
  ): number {
    let t = 0.5 - x * x - y * y - z * z - w * w;
    if (t <= 0) {
      return 0;
    }
    t *= t;

    return t * t * dot(grad, [x, y, z, w]);
  }

  public noise4(x: number, y: number, z: number, w: number): number {
    const s = (x + y + z + w) * F4;

    const i = Math.floor(x + s);
    const j = Math.floor(y + s);
    const k = Math.floor(z + s);
    const l = Math.floor(w + s);

    const t = (i + j + k + l) * G4;
    const ox = i - t;
    const oy = j - t;
    const oz = k - t;
    const ow = l - t;

    const x0 = x - ox;
    const y0 = y - oy;
    const z0 = z - oz;
    const w0 = w - ow;

    let rankx = 0;
    let ranky = 0;
    let rankz = 0;
    let rankw = 0;

    if (x0 > y0) rankx++;
    else ranky++;

    if (x0 > z0) rankx++;
    else rankz++;

    if (x0 > w0) rankx++;
    else rankw++;

    if (y0 > z0) ranky++;
    else rankz++;

    if (y0 > w0) ranky++;
    else rankw++;

    if (z0 > w0) rankz++;
    else rankw++;

    const i1 = rankx >= 3 ? 1 : 0;
    const j1 = ranky >= 3 ? 1 : 0;
    const k1 = rankz >= 3 ? 1 : 0;
    const l1 = rankw >= 3 ? 1 : 0;

    const i2 = rankx >= 2 ? 1 : 0;
    const j2 = ranky >= 2 ? 1 : 0;
    const k2 = rankz >= 2 ? 1 : 0;
    const l2 = rankw >= 2 ? 1 : 0;

    const i3 = rankx >= 1 ? 1 : 0;
    const j3 = ranky >= 1 ? 1 : 0;
    const k3 = rankz >= 1 ? 1 : 0;
    const l3 = rankw >= 1 ? 1 : 0;

    const x1 = x0 - i1 + G4;
    const y1 = y0 - j1 + G4;
    const z1 = z0 - k1 + G4;
    const w1 = w0 - l1 + G4;

    const x2 = x0 - i2 + 2 * G4;
    const y2 = y0 - j2 + 2 * G4;
    const z2 = z0 - k2 + 2 * G4;
    const w2 = w0 - l2 + 2 * G4;

    const x3 = x0 - i3 + 3 * G4;
    const y3 = y0 - j3 + 3 * G4;
    const z3 = z0 - k3 + 3 * G4;
    const w3 = w0 - l3 + 3 * G4;

    const x4 = x0 - 1 + 4 * G4;
    const y4 = y0 - 1 + 4 * G4;
    const z4 = z0 - 1 + 4 * G4;
    const w4 = w0 - 1 + 4 * G4;

    const hash0 = this.permutation.hash4(i, j, k, l);
    const hash1 = this.permutation.hash4(i + i1, j + j1, k + k1, l + l1);
    const hash2 = this.permutation.hash4(i + i2, j + j2, k + k2, l + l2);
    const hash3 = this.permutation.hash4(i + i3, j + j3, k + k3, l + l3);
    const hash4 = this.permutation.hash4(i + 1, j + 1, k + 1, l + 1);

    const grad0 = gradients4[hash0 % gradients4.length];
    const grad1 = gradients4[hash1 % gradients4.length];
    const grad2 = gradients4[hash2 % gradients4.length];
    const grad3 = gradients4[hash3 % gradients4.length];
    const grad4 = gradients4[hash4 % gradients4.length];

    let n0 = this.contribution4(grad0, x0, y0, z0, w0);
    let n1 = this.contribution4(grad1, x1, y1, z1, w1);
    let n2 = this.contribution4(grad2, x2, y2, z2, w2);
    let n3 = this.contribution4(grad3, x3, y3, z3, w3);
    let n4 = this.contribution4(grad4, x4, y4, z4, w4);
    return 27 * (n0 + n1 + n2 + n3 + n4);
  }
}
