import { range } from "@rgsoft/math";
import { sfc32, shuffle, xmur3 } from "./utils";

const permSize = 256;

export abstract class Perlin {
  protected permutation: Uint8Array;

  protected abstract _noise(...args: number[]): number;

  constructor(seed = "perlin") {
    const seeder = xmur3(seed);
    const rng = sfc32(seeder(), seeder(), seeder(), seeder());
    let perms = shuffle(range(0, permSize), rng);
    perms = perms.concat(perms);
    this.permutation = new Uint8Array(perms);
  }

  public noise(x: number, frequency = 1, amplitude = 1): number {
    return this._noise(x * frequency) * amplitude;
  }
}
