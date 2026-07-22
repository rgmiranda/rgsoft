import { Range } from "../types";
import { Noise } from "./noise";
import { NoiseBase } from "./noise-base";

export class Tileable extends NoiseBase {
  public readonly range: Range;

  constructor(private readonly source: Noise) {
    super();
    this.range = source.range;
  }

  noise1(x: number): number {
    const cx = Math.cos(x);
    const sx = Math.sin(x);
    return this.source.noise2(cx, sx);
  }

  noise2(x: number, y: number): number {
    const cx = Math.cos(x);
    const sx = Math.sin(x);
    const cy = Math.cos(y);
    const sy = Math.sin(y);
    return this.source.noise4(cx, sx, cy, sy);
  }

  noise3(x: number, y: number, z: number): number {
    throw new Error("Method not supported.");
  }

  noise4(x: number, y: number, z: number, w: number): number {
    throw new Error("Method not supported.");
  }
}
