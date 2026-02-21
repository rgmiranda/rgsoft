import { Vector2 } from "@rgsoft/linear";
import { Area } from "./area";
import { Rect } from "./rect";
import { Polygon } from "./polygon";

export class Circle implements Area {
  public readonly squaredRadius: number;

  constructor(
    public readonly c: Vector2,
    public readonly r: number,
  ) {
    if (typeof r !== "number" || r < 0) {
      throw new Error("Radius must be a positive number");
    }
    this.squaredRadius = r * r;
  }

  contains(p: Vector2): boolean {
    const dx = this.c.x - p.x;
    const dy = this.c.y - p.y;
    return dx * dx + dy * dy <= this.squaredRadius;
  }

  intersects(area: Area): boolean {
    return area.intersectsCircle(this);
  }

  intersectsRect(area: Rect): boolean {
    const nx = Math.max(area.o.x, Math.min(this.c.x, area.o.x + area.w));
    const ny = Math.max(area.o.y, Math.min(this.c.y, area.o.y + area.h));
    const dx = nx - this.c.x;
    const dy = ny - this.c.y;
    return this.squaredRadius >= dx * dx + dy * dy;
  }

  intersectsCircle(area: Circle): boolean {
    const dx = area.c.x - this.c.x;
    const dy = area.c.y - this.c.y;
    return this.squaredRadius + area.squaredRadius >= dx * dx + dy * dy;
  }

  intersectsPolygon(area: Polygon): boolean {
    if (area.contains(this.c)) {
      return true;
    }
    for (const v of area.vertex) {
      if (this.contains(v)) {
        return true;
      }
    }
    for (const side of area.sides) {
      if (side.distanceToPoint(this.c) < this.r) {
        return true;
      }
    }
    return false;
  }
}
