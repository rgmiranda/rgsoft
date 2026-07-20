import { Range } from "../types";
import { Noise } from "./noise";
import { NoiseBase } from "./noise-base";

export interface DomainWarpOptions {
  strength?: number;
}

export class DomainWarp extends NoiseBase {
  public readonly range: Range;
  public readonly strength: number;

  constructor(
    private readonly source: Noise,
    private readonly warp: Noise,
    options: DomainWarpOptions = {},
  ) {
    super();
    this.range = source.range;
    this.strength = options.strength ?? 20;
  }

  noise1(x: number): number {
    const wx = this.warp.noise1(x - 43.78);
    return this.source.noise1(x + wx * this.strength);
  }

  noise2(x: number, y: number): number {
    const wx = this.warp.noise2(x + 31.416, y + 92.731);
    const wy = this.warp.noise2(x - 14.8, y + 53.2);
    return this.source.noise2(x + wx * this.strength, y + wy * this.strength);
  }

  noise3(x: number, y: number, z: number): number {
    const wx = this.warp.noise3(x + 53.23, y - 74.127, z + 0.952);
    const wy = this.warp.noise3(x - 34.128, y - 17.981, z + 41.365);
    const wz = this.warp.noise3(x - 0.856, y + 33.333, z - 29.652);
    return this.source.noise3(
      x + wx * this.strength,
      y + wy * this.strength,
      z + wz * this.strength,
    );
  }
}
