import { lerp } from "@rgsoft/math";
import { dot, fade, PermutationTable } from "../utils";
import { NoiseBase } from "./noise-base";

const SQRT1_2 = Math.sqrt(2) / 2;
const SQRT1_3 = 1 / Math.sqrt(3);
const SQRT2 = Math.sqrt(2);

const STRETCH_CONSTANT_2D = -0.21132486540518713;
const SQUISH_CONSTANT_2D = 0.3660254037844386;
const STRETCH_CONSTANT_3D = -1 / 6;
const SQUISH_CONSTANT_3D = 1 / 3;
const STRETCH_CONSTANT_4D = -0.1381966011250105;
const SQUISH_CONSTANT_4D = 0.3090169943749474;

const gradients2: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [SQRT1_2, SQRT1_2],
  [SQRT1_2, -SQRT1_2],
  [-SQRT1_2, SQRT1_2],
  [-SQRT1_2, -SQRT1_2],
];

const gradients3: [number, number, number][] = [
  [1, 1, 0],
  [-1, 1, 0],
  [1, -1, 0],
  [-1, -1, 0],
  [1, 0, 1],
  [-1, 0, 1],
  [1, 0, -1],
  [-1, 0, -1],
  [0, 1, 1],
  [0, -1, 1],
  [0, 1, -1],
  [0, -1, -1],
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
  [1, 1, 1, 1],
  [-1, 1, 1, 1],
  [1, -1, 1, 1],
  [-1, -1, 1, 1],
  [1, 1, -1, 1],
  [-1, 1, -1, 1],
  [1, -1, -1, 1],
  [-1, -1, -1, 1],
  [1, 1, 1, -1],
  [-1, 1, 1, -1],
  [1, -1, 1, -1],
  [-1, -1, 1, -1],
  [1, 1, -1, -1],
  [-1, 1, -1, -1],
  [1, -1, -1, -1],
  [-1, -1, -1, -1],
];

export class OpenSimplex extends NoiseBase {
  protected permutation: PermutationTable;

  constructor(seed = "opensimplex") {
    super();
    this.permutation = new PermutationTable(seed);
  }

  public noise1(x: number): number {
    const i0 = Math.floor(x);
    const i1 = i0 + 1;
    const dx0 = x - i0;
    const dx1 = x - i1;

    const h0 = this.permutation.hash1(i0);
    const h1 = this.permutation.hash1(i1);
    const g0 = h0 % 2 === 0 ? 1 : -1;
    const g1 = h1 % 2 === 0 ? 1 : -1;

    const n0 = g0 * dx0;
    const n1 = g1 * dx1;
    return lerp(n0, n1, fade(dx0));
  }

  public noise2(x: number, y: number): number {
    const stretchOffset = (x + y) * STRETCH_CONSTANT_2D;
    const i = Math.floor(x + stretchOffset);
    const j = Math.floor(y + stretchOffset);

    const squishOffset = (i + j) * SQUISH_CONSTANT_2D;
    const x0 = x - (i - squishOffset);
    const y0 = y - (j - squishOffset);

    const xins = x0 >= y0 ? 1 : 0;
    const yins = x0 >= y0 ? 0 : 1;

    const x1 = x0 - xins + SQUISH_CONSTANT_2D;
    const y1 = y0 - yins + SQUISH_CONSTANT_2D;
    const x2 = x0 - 1 + 2 * SQUISH_CONSTANT_2D;
    const y2 = y0 - 1 + 2 * SQUISH_CONSTANT_2D;

    const hash = this.permutation.hash2(i, j);
    const grad0 = gradients2[hash % gradients2.length];
    const grad1 = gradients2[(hash + xins + 1) % gradients2.length];
    const grad2 = gradients2[(hash + yins + 1) % gradients2.length];

    const n0 = this.contribution2(grad0, x0, y0);
    const n1 = this.contribution2(grad1, x1, y1);
    const n2 = this.contribution2(grad2, x2, y2);

    return n0 + n1 + n2;
  }

  public noise3(x: number, y: number, z: number): number {
    const stretchOffset = (x + y + z) * STRETCH_CONSTANT_3D;
    const i = Math.floor(x + stretchOffset);
    const j = Math.floor(y + stretchOffset);
    const k = Math.floor(z + stretchOffset);

    const squishOffset = (i + j + k) * SQUISH_CONSTANT_3D;
    const x0 = x - (i - squishOffset);
    const y0 = y - (j - squishOffset);
    const z0 = z - (k - squishOffset);

    const xins = x0 >= y0 ? 1 : 0;
    const yins = x0 >= z0 ? 1 : 0;
    const zins = y0 >= z0 ? 1 : 0;

    const x1 = x0 - xins + SQUISH_CONSTANT_3D;
    const y1 = y0 - yins + SQUISH_CONSTANT_3D;
    const z1 = z0 - zins + SQUISH_CONSTANT_3D;

    const x2 = x0 - 1 + 2 * SQUISH_CONSTANT_3D;
    const y2 = y0 - 1 + 2 * SQUISH_CONSTANT_3D;
    const z2 = z0 - 1 + 2 * SQUISH_CONSTANT_3D;

    const hash = this.permutation.hash3(i, j, k);
    const grad0 = gradients3[hash % gradients3.length];
    const grad1 = gradients3[(hash + 1) % gradients3.length];
    const grad2 = gradients3[(hash + 2) % gradients3.length];
    const grad3 = gradients3[(hash + 3) % gradients3.length];

    const n0 = this.contribution3(grad0, x0, y0, z0);
    const n1 = this.contribution3(grad1, x1, y1, z1);
    const n2 = this.contribution3(grad2, x2, y2, z2);
    const n3 = this.contribution3(grad3, x0 - 1 + SQUISH_CONSTANT_3D, y0 - 1 + SQUISH_CONSTANT_3D, z0 - 1 + SQUISH_CONSTANT_3D);

    return n0 + n1 + n2 + n3;
  }

  public noise4(x: number, y: number, z: number, w: number): number {
    const stretchOffset = (x + y + z + w) * STRETCH_CONSTANT_4D;
    const i = Math.floor(x + stretchOffset);
    const j = Math.floor(y + stretchOffset);
    const k = Math.floor(z + stretchOffset);
    const l = Math.floor(w + stretchOffset);

    const squishOffset = (i + j + k + l) * SQUISH_CONSTANT_4D;
    const x0 = x - (i - squishOffset);
    const y0 = y - (j - squishOffset);
    const z0 = z - (k - squishOffset);
    const w0 = w - (l - squishOffset);

    const hash = this.permutation.hash4(i, j, k, l);
    const grad0 = gradients4[hash % gradients4.length];
    const grad1 = gradients4[(hash + 1) % gradients4.length];
    const grad2 = gradients4[(hash + 2) % gradients4.length];
    const grad3 = gradients4[(hash + 3) % gradients4.length];
    const grad4 = gradients4[(hash + 4) % gradients4.length];

    const n0 = this.contribution4(grad0, x0, y0, z0, w0);
    const n1 = this.contribution4(grad1, x0 - 1 + SQUISH_CONSTANT_4D, y0, z0, w0);
    const n2 = this.contribution4(grad2, x0, y0 - 1 + SQUISH_CONSTANT_4D, z0, w0);
    const n3 = this.contribution4(grad3, x0, y0, z0 - 1 + SQUISH_CONSTANT_4D, w0);
    const n4 = this.contribution4(grad4, x0, y0, z0, w0 - 1 + SQUISH_CONSTANT_4D);

    return n0 + n1 + n2 + n3 + n4;
  }

  private contribution2(grad: [number, number], x: number, y: number): number {
    const t = 0.5 - x * x - y * y;
    if (t <= 0) return 0;
    const t2 = t * t;
    return t2 * t2 * dot(grad, [x, y]);
  }

  private contribution3(grad: [number, number, number], x: number, y: number, z: number): number {
    const t = 0.6 - x * x - y * y - z * z;
    if (t <= 0) return 0;
    const t2 = t * t;
    return t2 * t2 * dot(grad, [x, y, z]);
  }

  private contribution4(grad: [number, number, number, number], x: number, y: number, z: number, w: number): number {
    const t = 0.6 - x * x - y * y - z * z - w * w;
    if (t <= 0) return 0;
    const t2 = t * t;
    return t2 * t2 * dot(grad, [x, y, z, w]);
  }
}
