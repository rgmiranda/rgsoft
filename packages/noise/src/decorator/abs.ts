import { Noise } from "../noise";
import { Range } from "../types";
import { NoiseDecorator } from "./noise-decorator";

export class Abs extends NoiseDecorator {
  public readonly range: Range;

  constructor(
    source: Noise,
  ) {
    super(source);
    this.range = [Math.max(source.range[0], 0), Math.max(source.range[1], 0)];
  }

  noise1(x: number): number {
    return Math.abs(this.source.noise1(x));
  }
  noise2(x: number, y: number): number {
    return Math.abs(this.source.noise2(x, y));
  }
  noise3(x: number, y: number, z: number): number {
    return Math.abs(this.source.noise3(x, y, z));
  }
}
