import { Range } from "../types";

export interface Noise {
  range: Range;
  noise1(x: number): number;
  noise2(x: number, y: number): number;
  noise3(x: number, y: number, z: number): number;
  noise4(x: number, y: number, z: number, w: number): number;
}
