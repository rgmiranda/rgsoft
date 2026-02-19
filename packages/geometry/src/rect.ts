import { Area } from "./area";
import { Circle } from "./circle";
import { Point } from "./point";

export class Rect implements Area {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly w: number,
    public readonly h: number,
  ) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('x and y coordinates must be numbers');
    }
    if (typeof w !== 'number' || typeof h !== 'number') {
      throw new Error('Width and height must be numbers');
    }
    if (w < 0 || h < 0) {
      throw new Error('Width and height must be positive');
    }
  }

  contains(p: Point): boolean {
    return (
      p.x >= this.x &&
      p.x <= this.x + this.w &&
      p.y >= this.y &&
      p.y <= this.y + this.h
    );
  }

  intersects(area: Area): boolean {
    if (area instanceof Rect) {
      return (
        this.x + this.w > area.x &&
        this.x < area.x + area.w &&
        this.y + this.h > area.y &&
        this.y < area.y + area.h
      );
    } else if (area instanceof Circle) {
      const nx = Math.max(this.x, Math.min(area.x, this.x + this.w));
      const ny = Math.max(this.y, Math.min(area.y, this.y + this.h));
      const dx = nx - area.x;
      const dy = ny - area.y;
      return area.squaredRadius >= dx * dx + dy * dy;
    } else {
      throw new Error("Unrecognized area type");
    }
  }
}
