import { Point } from "./point";

export interface Area {
  contains(p: Point): boolean;
  intersects(area: Area): boolean;
}
