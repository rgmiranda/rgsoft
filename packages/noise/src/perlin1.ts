import { lerp } from "@rgsoft/math";
import { fade } from "./utils";
import { Perlin } from "./perlin";

const gradients = [1, -1];
const permSize = 256;

export class Perlin1 extends Perlin {

  constructor(seed = "perlin1") {
    super(seed);
  }

  _noise(x: number): number {
    const xp = Math.floor(x) & (permSize - 1);
    const x0 = Math.floor(x);
    const x1 = x0 + 1;
    const dx0 = x - x0;
    const dx1 = x - x1;
    const g1 = gradients[this.permutation[xp] % gradients.length];
    const g2 = gradients[this.permutation[xp + 1] % gradients.length];
    const n0 = g1 * dx0;
    const n1 = g2 * dx1;
    const u = fade(dx0);

    return lerp(n0, n1, u);
  }
}
