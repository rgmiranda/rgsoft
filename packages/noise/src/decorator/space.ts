import { Noise } from "../noise";
import { Range } from "../types";
import { NoiseDecorator } from "./noise-decorator";

export class Space extends NoiseDecorator {
  public readonly range: Range;

  constructor(
    source: Noise,
    private readonly space: number,
  ) {
    super(source);
    this.range = [...source.range];
  }

  noise1(x: number): number {
    return this.source.noise1(this.space * x);
  }
  noise2(x: number, y: number): number {
    return this.source.noise2(this.space * x, this.space * y);
  }
  noise3(x: number, y: number, z: number): number {
    return this.source.noise3(this.space * x, this.space * y, this.space * z);
  }
  noise4(x: number, y: number, z: number, w: number): number {
    return this.source.noise4(this.space * x, this.space * y, this.space * z, this.space * w);
  }
}
