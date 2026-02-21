import { Vector2 } from "@rgsoft/linear";
import { Circle } from "./circle";
import { Rect } from "./rect";
import { Polygon } from "./polygon";

export interface Area {
  contains(p: Vector2): boolean;
  intersects(area: Area): boolean;
  intersectsCircle(area: Circle): boolean;
  intersectsRect(area: Rect): boolean;
  intersectsPolygon(area: Polygon): boolean;
}
