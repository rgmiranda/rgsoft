import { range } from "@rgsoft/math";
import { rngFactory, shuffle, xmur3 } from "../utils";
import { NoiseBase } from "./noise-base";

const permSize = 256;

export class WhiteNoise extends NoiseBase {
  protected permutation: Uint8Array;
  constructor(seed = "white") {
    super();
    const rng = rngFactory(seed);
    let perms = shuffle(range(0, permSize), rng);
    perms = perms.concat(perms);
    this.permutation = new Uint8Array(perms);
  }

  private getHash(...args: number[]): number {
    const hashSeed = args
      .map((value, index) => `${index}:${value}`)
      .join("|");

    return xmur3(hashSeed)() & (permSize - 1);
  }

  noise1(x: number): number {
    const hash = this.getHash(x);
    return this.permutation[hash] / (permSize - 1);
  }
  noise2(x: number, y: number): number {
    const hash = this.getHash(x, y);
    return this.permutation[hash] / (permSize - 1);
  }
  noise3(x: number, y: number, z: number): number {
    const hash = this.getHash(x, y, z);
    return this.permutation[hash] / (permSize - 1);
  }
}
