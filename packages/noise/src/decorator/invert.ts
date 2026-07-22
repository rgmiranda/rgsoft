import { Noise } from "../noise";
import { Range } from "../types";
import { NoiseDecorator } from "./noise-decorator";

export class Invert extends NoiseDecorator {
  public readonly range: Range;

  constructor(
    source: Noise,
  ) {
    super(source);
    this.range = [-1 * source.range[1], -1 * source.range[0]];
  }
  noise1(x: number): number {
    return -1 * this.source.noise1(x);
  }
  noise2(x: number, y: number): number {
    return -1 * this.source.noise2(x, y);
  }
  noise3(x: number, y: number, z: number): number {
    return -1 * this.source.noise3(x, y, z);
  }
  noise4(x: number, y: number, z: number, w: number): number {
    return -1 * this.source.noise4(x, y, z, w);
  }
}
