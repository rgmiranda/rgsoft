import { Noise } from "../noise";
import { NoiseDecorator } from "./noise-decorator";

export class Clamp extends NoiseDecorator {
  constructor(
    source: Noise,
    private readonly min: number,
    private readonly max: number,
  ) {
    super(source);
    if (min > max) {
      throw new Error('Min cannot be greater than max');
    }
  }

  noise1(x: number): number {
    return Math.max(Math.min(this.source.noise1(x), this.max), this.min);
  }
  noise2(x: number, y: number): number {
    return Math.max(Math.min(this.source.noise2(x, y), this.max), this.min);
  }
  noise3(x: number, y: number, z: number): number {
    return Math.max(Math.min(this.source.noise3(x, y, z), this.max), this.min);
  }
}
