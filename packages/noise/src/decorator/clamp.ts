import { Noise } from "../noise";
import { Range } from "../types";
import { NoiseDecorator } from "./noise-decorator";

export class Clamp extends NoiseDecorator {
  constructor(
    source: Noise,
    public readonly range: Range
  ) {
    super(source);
    if (range[0] > range[1]) {
      throw new Error('Min cannot be greater than max');
    }
  }

  noise1(x: number): number {
    return Math.max(Math.min(this.source.noise1(x), this.range[1]), this.range[0]);
  }
  noise2(x: number, y: number): number {
    return Math.max(Math.min(this.source.noise2(x, y), this.range[1]), this.range[0]);
  }
  noise3(x: number, y: number, z: number): number {
    return Math.max(Math.min(this.source.noise3(x, y, z), this.range[1]), this.range[0]);
  }
}
