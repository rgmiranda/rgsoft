import { Noise } from "../noise";
import { Range } from "../types";

export abstract class NoiseDecorator implements Noise {
  public readonly range: Range = [-1, 1];
  constructor(protected readonly source: Noise) {}
  abstract noise1(x: number): number;
  abstract noise2(x: number, y: number): number;
  abstract noise3(x: number, y: number, z: number): number;
  abstract noise4(x: number, y: number, z: number, w: number): number;
}
