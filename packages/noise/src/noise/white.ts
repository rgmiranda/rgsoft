import { xmur3 } from "../utils";
import { NoiseBase } from "./noise-base";

export class WhiteNoise extends NoiseBase {
  private readonly seedValue: number;

  constructor(seed = "white") {
    super();

    this.seedValue = xmur3(seed)();
  }

  private hash(...coords: number[]): number {
    let h = this.seedValue;

    for (const coord of coords) {
      h ^= Math.floor(coord);
      h = Math.imul(h, 0x7feb352d);
      h ^= h >>> 15;
      h = Math.imul(h, 0x846ca68b);
      h ^= h >>> 16;
    }

    return h >>> 0;
  }

  private toUnit(hash: number): number {
    return (hash / 0x100000000) * 2 - 1;
  }

  public noise1(x: number): number {
    return this.toUnit(this.hash(x));
  }

  public noise2(x: number, y: number): number {
    return this.toUnit(this.hash(x, y));
  }

  public noise3(x: number, y: number, z: number): number {
    return this.toUnit(this.hash(x, y, z));
  }
}
