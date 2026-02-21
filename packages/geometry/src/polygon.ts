import { EPSILON } from "@rgsoft/math";
import { Area } from "./area";
import { Vector2 } from "@rgsoft/linear";
import { Segment2 } from "./segment2";
import { Circle } from "./circle";
import { Rect } from "./rect";

export class Polygon implements Area {
  public readonly sides: Segment2[];

  constructor(public readonly vertex: Vector2[]) {
    const n = vertex.length;
    if (n < 3) {
      throw new Error('At least three vertex are required');
    }
    this.sides = [];
    for (let i = 0, j = n - 1; i < n; j = i++) {
      this.sides.push(new Segment2(vertex[i], vertex[j]));
    }
  }

  get centroid(): Vector2 {
    let x = 0,
      y = 0;
    this.vertex.forEach((v) => {
      x += v.x;
      y += v.y;
    });
    return new Vector2([x / this.vertex.length, y / this.vertex.length]);
  }

  contains(p: Vector2): boolean {
    for (const side of this.sides) {
      if (side.contains(p)) {
        return true;
      }
    }

    let inside = false;
    const n = this.vertex.length;
    for (let i = 0, j = n - 1; i < n; j = i++) {
      const xi = this.vertex[i].x,
        yi = this.vertex[i].y;
      const xj = this.vertex[j].x,
        yj = this.vertex[j].y;
      const intersect =
        yi > p.y !== yj > p.y &&
        p.x < ((xj - xi) * (p.y - yi)) / (yj - yi) + xi;
      if (intersect) {
        inside = !inside;
      }
    }
    return inside;
  }

  intersects(area: Area): boolean {
    return area.intersectsPolygon(this);
  }

  intersectsCircle(area: Circle): boolean {
    if (this.contains(area.c)) {
      return true;
    }
    for (const v of this.vertex) {
      if (area.contains(v)) {
        return true;
      }
    }
    for (const side of this.sides) {
      if (side.distanceToPoint(area.c) < area.r) {
        return true;
      }
    }
    return false;
  }

  intersectsRect(area: Rect): boolean {
    for (const s1 of this.sides) {
      for (const s2 of area.sides) {
        if (s1.intersects(s2)) {
          return true;
        }
      }
    }

    if (area.contains(this.vertex[0])) {
      return true;
    }

    if (this.contains(area.o)) {
      return true;
    }
    return false;
  }

  intersectsPolygon(area: Polygon): boolean {
    for (const s1 of this.sides) {
      for (const s2 of area.sides) {
        if (s1.intersects(s2)) {
          return true;
        }
      }
    }

    if (area.contains(this.vertex[0])) {
      return true;
    }

    if (this.contains(area.vertex[0])) {
      return true;
    }
    return false;
  }

  isOnEdge(p: Vector2, tolerance = EPSILON): boolean {
    const n = this.vertex.length;
    for (let i = 0; i < n; i++) {
      const a = this.vertex[i];
      const b = this.vertex[(i + 1) % n];
      const cross = (b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x);
      const dot = (p.x - a.x) * (p.x - b.x) + (p.y - a.y) * (p.y - b.y);
      if (Math.abs(cross) < tolerance && dot <= 0) return true;
    }
    return false;
  }
}
