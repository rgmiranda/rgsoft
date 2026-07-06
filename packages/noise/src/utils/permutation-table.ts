import { range } from "@rgsoft/math";
import { rngFactory } from "./rng-factory";
import { shuffle } from "./shuffle";
import { GOLDEN_RATIO_HASH } from "../constants";

export class PermutationTable {
  public readonly mask: number;
  private readonly table: Uint8Array<ArrayBuffer>;

  constructor(
    seed: string,
    public readonly size = 256,
  ) {
    this.mask = size - 1;
    const rng = rngFactory(seed);
    const values = shuffle(range(0, size), rng);

    const table = new Uint8Array(size * 2);

    table.set(values);
    table.set(values, size);

    this.table = table;
  }

  private mix(hash: number, stream: number): number {
    return (hash + stream * GOLDEN_RATIO_HASH) >>> 0;
  }

  hash1(x: number): number {
    return this.table[x & this.mask];
  }

  hash2(x: number, y: number): number {
    const hy = this.table[y & this.mask];
    return this.table[(x + hy) & this.mask];
  }

  hash3(x: number, y: number, z: number): number {
    const hz = this.table[z & this.mask];
    const hy = this.table[(y + hz) & this.mask];
    return this.table[(x + hy) & this.mask];
  }

  get(index: number): number {
    return this.table[index & this.mask];
  }

  random01(hash: number, stream = 0): number {
    const h = this.table[this.mix(hash, stream) & this.mask];
    return h / this.mask;
  }
}
