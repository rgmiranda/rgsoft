import { lerp } from "@rgsoft/math";
import { NoiseBase } from "./noise-base";
import { WhiteNoise } from "./white";
import { fade } from "../utils";

export class ValueNoise extends NoiseBase {
  private readonly white: WhiteNoise;

  constructor(seed = "value") {
    super();
    this.white = new WhiteNoise(seed);
  }

  public noise1(x: number): number {
    const i0 = Math.floor(x);
    const i1 = i0 + 1;

    const vx0 = this.white.noise1(i0);
    const vx1 = this.white.noise1(i1);

    const u = fade(x - i0);

    return lerp(vx0, vx1, u);
  }

  public noise2(x: number, y: number): number {
    const i0 = Math.floor(x);
    const j0 = Math.floor(y);

    const i1 = i0 + 1;
    const j1 = j0 + 1;

    const u = fade(x - i0);
    const v = fade(y - j0);

    const v00 = this.white.noise2(i0, j0);
    const v10 = this.white.noise2(i1, j0);
    const v01 = this.white.noise2(i0, j1);
    const v11 = this.white.noise2(i1, j1);
    const ix0 = lerp(v00, v10, u);
    const ix1 = lerp(v01, v11, u);
    return lerp(ix0, ix1, v);
  }

  public noise3(x: number, y: number, z: number): number {
    const i0 = Math.floor(x);
    const j0 = Math.floor(y);
    const k0 = Math.floor(z);

    const i1 = i0 + 1;
    const j1 = j0 + 1;
    const k1 = k0 + 1;

    const u = fade(x - i0);
    const v = fade(y - j0);
    const w = fade(z - k0);

    const v000 = this.white.noise3(i0, j0, k0);
    const v100 = this.white.noise3(i1, j0, k0);
    const v010 = this.white.noise3(i0, j1, k0);
    const v110 = this.white.noise3(i1, j1, k0);
    const v001 = this.white.noise3(i0, j0, k1);
    const v101 = this.white.noise3(i1, j0, k1);
    const v011 = this.white.noise3(i0, j1, k1);
    const v111 = this.white.noise3(i1, j1, k1);

    const ix00 = lerp(v000, v100, u);
    const ix10 = lerp(v010, v110, u);

    const ix01 = lerp(v001, v101, u);
    const ix11 = lerp(v011, v111, u);

    const iy0 = lerp(ix00, ix10, v);
    const iy1 = lerp(ix01, ix11, v);

    return lerp(iy0, iy1, w);
  }

  public noise4(x: number, y: number, z: number, w: number): number {
    const i0 = Math.floor(x);
    const j0 = Math.floor(y);
    const k0 = Math.floor(z);
    const l0 = Math.floor(w);

    const i1 = i0 + 1;
    const j1 = j0 + 1;
    const k1 = k0 + 1;
    const l1 = l0 + 1;

    const ux = fade(x - i0);
    const uy = fade(y - j0);
    const uz = fade(z - k0);
    const uw = fade(w - l0);

    const v0000 = this.white.noise4(i0, j0, k0, l0);
    const v1000 = this.white.noise4(i1, j0, k0, l0);
    const v0100 = this.white.noise4(i0, j1, k0, l0);
    const v1100 = this.white.noise4(i1, j1, k0, l0);
    const v0010 = this.white.noise4(i0, j0, k1, l0);
    const v1010 = this.white.noise4(i1, j0, k1, l0);
    const v0110 = this.white.noise4(i0, j1, k1, l0);
    const v1110 = this.white.noise4(i1, j1, k1, l0);
    const v0001 = this.white.noise4(i0, j0, k0, l1);
    const v1001 = this.white.noise4(i1, j0, k0, l1);
    const v0101 = this.white.noise4(i0, j1, k0, l1);
    const v1101 = this.white.noise4(i1, j1, k0, l1);
    const v0011 = this.white.noise4(i0, j0, k1, l1);
    const v1011 = this.white.noise4(i1, j0, k1, l1);
    const v0111 = this.white.noise4(i0, j1, k1, l1);
    const v1111 = this.white.noise4(i1, j1, k1, l1);

    const ix000 = lerp(v0000, v1000, ux);
    const ix100 = lerp(v0100, v1100, ux);

    const ix010 = lerp(v0010, v1010, ux);
    const ix110 = lerp(v0110, v1110, ux);

    const ix001 = lerp(v0001, v1001, ux);
    const ix101 = lerp(v0101, v1101, ux);

    const ix011 = lerp(v0011, v1011, ux);
    const ix111 = lerp(v0111, v1111, ux);

    const iy00 = lerp(ix000, ix100, uy);
    const iy10 = lerp(ix010, ix110, uy);

    const iy01 = lerp(ix001, ix101, uy);
    const iy11 = lerp(ix011, ix111, uy);

    const iz0 = lerp(iy00, iy10, uz);
    const iz1 = lerp(iy01, iy11, uz);

    return lerp(iz0, iz1, uw);
  }
}
