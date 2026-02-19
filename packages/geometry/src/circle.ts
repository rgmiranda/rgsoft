import { Area } from "./area";
import { Point } from "./point";
import { Rect } from "./rect";

export class Circle implements Area {
  public readonly squaredRadius: number;

  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly r: number,
  ) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error("x and y coordinates must be numbers");
    }
    if (typeof r !== 'number' || r < 0) {
      throw new Error("Radius must be a positive number");
    }
    this.squaredRadius = r * r;
  }

  contains(p: Point): boolean {
    const dx = this.x - p.x;
    const dy = this.y - p.y;
    return dx * dx + dy * dy <= this.squaredRadius;
  }

  intersects(area: Area): boolean {
    return area.intersectsCircle(this);
  }

  intersectsRect(area: Rect): boolean {
    const nx = Math.max(area.x, Math.min(this.x, area.x + area.w));
    const ny = Math.max(area.y, Math.min(this.y, area.y + area.h));
    const dx = nx - this.x;
    const dy = ny - this.y;
    return this.squaredRadius >= dx * dx + dy * dy;
  }

  intersectsCircle(area: Circle): boolean {
    const dx = area.x - this.x;
    const dy = area.y - this.y;
    return this.squaredRadius + area.squaredRadius >= dx * dx + dy * dy;
  }
}
