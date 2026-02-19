import { EPSILON } from '@rgsoft/math';
import { Point } from './point';
import { Area } from './area';

export class Polygon implements Area {
  constructor(
    public readonly vertex: Point[],
    public readonly site: Point,
  ) {}

  get centroid(): Point {
    let x = 0,
      y = 0;
    this.vertex.forEach((v) => {
      x += v.x;
      y += v.y;
    });
    return { x: x / this.vertex.length, y: y / this.vertex.length };
  }

  contains(p: Point): boolean {
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
      if (intersect) inside = !inside;
    }
    return inside;
  }

  intersects(area: Area): boolean {
    throw new Error("Method not implemented.");
  }

  containsOrOnEdge(p: Point): boolean {
    return this.contains(p) || this.isOnEdge(p);
  }

  isOnEdge(p: Point, tolerance = EPSILON): boolean {
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
