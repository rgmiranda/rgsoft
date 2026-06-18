import { Noise } from "./noise";

export abstract class NoiseBase implements Noise {
  abstract noise1(x: number): number;
  abstract noise2(x: number, y: number): number;
  abstract noise3(x: number, y: number, z: number): number;
}
