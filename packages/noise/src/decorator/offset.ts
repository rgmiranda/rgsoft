import { Noise } from "../noise";
import { NoiseDecorator } from "./noise-decorator";

export class Offset extends NoiseDecorator {

  constructor(source: Noise, private readonly offset: number) {
    super(source);
  }

  noise1(x: number): number {
    return this.source.noise1(x) + this.offset;
  }
  noise2(x: number, y: number): number {
    return this.source.noise2(x, y) + this.offset;
  }
  noise3(x: number, y: number, z: number): number {
    return this.source.noise3(x, y ,z) + this.offset;
  }
}
