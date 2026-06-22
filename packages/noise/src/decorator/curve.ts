import { Noise } from "../noise";
import { Range } from "../types";
import { NoiseDecorator } from "./noise-decorator";

export class Curve extends NoiseDecorator {
  constructor(
    source: Noise,
    private readonly curve: (x: number) => number,
    private readonly range: Range,
  ) {
    super(source);
  }

  private apply(x: number): number {
    // [min,max] → [0,1]
    const t = (x - this.range[0]) / (this.range[1] - this.range[0]);

    const u = this.curve(t);

    // [0,1] → [min,max]
    return this.range[0] + u * (this.range[1] - this.range[0]);
  }

  public noise1(x: number): number {
    return this.apply(this.source.noise1(x));
  }

  public noise2(x: number, y: number): number {
    return this.apply(this.source.noise2(x, y));
  }

  public noise3(x: number, y: number, z: number): number {
    return this.apply(this.source.noise3(x, y, z));
  }
}
