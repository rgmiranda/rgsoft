import { xmur3 } from "../utils";
import { NoiseBase } from "./noise-base";

export class WhiteNoise extends NoiseBase {
  private readonly seedValue: number;

  constructor(seed = "white") {
    super();

    this.seedValue = xmur3(seed)();
  }

  private hash1(x: number): number {
    let h = this.seedValue;

    h ^= Math.floor(x);
    h = Math.imul(h, 0x7feb352d);
    h ^= h >>> 15;
    h = Math.imul(h, 0x846ca68b);
    h ^= h >>> 16;

    return h >>> 0;
  }

  private hash2(x: number, y: number): number {
    let h = this.seedValue;

    h ^= Math.imul(Math.floor(x), 0x9e3779b1);
    h ^= Math.imul(Math.floor(y), 0x85ebca77);

    h ^= h >>> 16;
    h = Math.imul(h, 0x7feb352d);
    h ^= h >>> 15;
    h = Math.imul(h, 0x846ca68b);
    h ^= h >>> 16;

    return h >>> 0;
  }

  private hash3(x: number, y: number, z: number): number {
    let h = this.seedValue;

    h ^= Math.imul(Math.floor(x), 0x9e3779b1);
    h ^= Math.imul(Math.floor(y), 0x85ebca77);
    h ^= Math.imul(Math.floor(z), 0xc2b2ae3d);

    h ^= h >>> 16;
    h = Math.imul(h, 0x7feb352d);
    h ^= h >>> 15;
    h = Math.imul(h, 0x846ca68b);
    h ^= h >>> 16;

    return h >>> 0;
  }

  private hash4(x: number, y: number, z: number, w: number): number {
    let h = this.seedValue;

    h ^= Math.imul(Math.floor(x), 0x1789fe2a);
    h ^= Math.imul(Math.floor(y), 0x89afc451);
    h ^= Math.imul(Math.floor(z), 0x90aab00f);
    h ^= Math.imul(Math.floor(w), 0xbc056af1);

    h ^= h >>> 16;
    h = Math.imul(h, 0x7feb352d);
    h ^= h >>> 15;
    h = Math.imul(h, 0x846ca68b);
    h ^= h >>> 16;

    return h >>> 0;
  }

  private toUnit(hash: number): number {
    return (hash / 0x100000000) * 2 - 1;
  }

  public noise1(x: number): number {
    return this.toUnit(this.hash1(x));
  }

  public noise2(x: number, y: number): number {
    return this.toUnit(this.hash2(x, y));
  }

  public noise3(x: number, y: number, z: number): number {
    return this.toUnit(this.hash3(x, y, z));
  }

  public noise4(x: number, y: number, z: number, w: number): number {
    return this.toUnit(this.hash4(x, y, z, w));
  }
}
