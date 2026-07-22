import { Noise } from "../noise";
import { Range } from "../types";
import { NoiseDecorator } from "./noise-decorator";

export class Amp extends NoiseDecorator {
  public readonly range: Range;

  constructor(
    source: Noise,
    private readonly amplitude: number,
  ) {
    super(source);
    this.range = [source.range[0] * amplitude, source.range[1] * amplitude];
  }

  noise1(x: number): number {
    return this.amplitude * this.source.noise1(x);
  }
  noise2(x: number, y: number): number {
    return this.amplitude * this.source.noise2(x, y);
  }
  noise3(x: number, y: number, z: number): number {
    return this.amplitude * this.source.noise3(x, y, z);
  }
  noise4(x: number, y: number, z: number, w: number): number {
    return this.amplitude * this.source.noise4(x, y, z, w);
  }
}
