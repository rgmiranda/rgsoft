import { Vector2 } from "@rgsoft/linear";
import { Area } from "./area";
import { Circle } from "./circle";
import { Polygon } from "./polygon";
import { Segment2 } from "./segment2";

export class Rect implements Area {
  public readonly sides: [Segment2, Segment2, Segment2, Segment2];

  constructor(
    public readonly o: Vector2,
    public readonly w: number,
    public readonly h: number,
  ) {
    if (typeof w !== "number" || typeof h !== "number") {
      throw new Error("Width and height must be numbers");
    }
    if (w < 0 || h < 0) {
      throw new Error("Width and height must be positive");
    }

    const wv = new Vector2([w, 0]);
    const hv = new Vector2([0, h]);

    this.sides = [
      new Segment2(o, o.add(wv)),
      new Segment2(o.add(wv), o.add(wv).add(hv)),
      new Segment2(o.add(wv).add(hv), o.add(hv)),
      new Segment2(o.add(hv), o),
    ];
  }

  contains(p: Vector2): boolean {
    return (
      p.x >= this.o.x &&
      p.x <= this.o.x + this.w &&
      p.y >= this.o.y &&
      p.y <= this.o.y + this.h
    );
  }

  intersects(area: Area): boolean {
    return area.intersectsRect(this);
  }

  intersectsRect(area: Rect): boolean {
    return (
      this.o.x + this.w > area.o.x &&
      this.o.x < area.o.x + area.w &&
      this.o.y + this.h > area.o.y &&
      this.o.y < area.o.y + area.h
    );
  }

  intersectsCircle(area: Circle): boolean {
    const nx = Math.max(this.o.x, Math.min(area.c.x, this.o.x + this.w));
    const ny = Math.max(this.o.y, Math.min(area.c.y, this.o.y + this.h));
    const dx = nx - area.c.x;
    const dy = ny - area.c.y;
    return area.squaredRadius >= dx * dx + dy * dy;
  }

  intersectsPolygon(area: Polygon): boolean {
    for (const s1 of this.sides) {
      for (const s2 of area.sides) {
        if (s1.intersects(s2)) {
          return true;
        }
      }
    }

    if (this.contains(area.vertex[0])) {
      return true;
    }

    if (area.contains(this.o)) {
      return true;
    }
    return false;
  }
}
