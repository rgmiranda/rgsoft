import { Range } from "../types";
import { Noise } from "./noise";

export abstract class NoiseBase implements Noise {
  public readonly range: Range = [-1, 1];
  abstract noise1(x: number): number;
  abstract noise2(x: number, y: number): number;
  abstract noise3(x: number, y: number, z: number): number;
  abstract noise4(x: number, y: number, z: number, w: number): number;
}
