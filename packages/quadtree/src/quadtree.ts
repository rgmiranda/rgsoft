import { Area, Rect } from "@rgsoft/geometry";
import { Vector2 } from "@rgsoft/linear";

export class QuadTree {
  private readonly points: Vector2[] = [];
  private quadrants?: [QuadTree, QuadTree, QuadTree, QuadTree];

  constructor(
    public readonly k: number,
    public readonly boundary: Rect,
  ) {}

  addPoint(p: Vector2): void {
    if (!this.boundary.contains(p)) {
      throw new Error(`Point { x: ${p.x}, y: ${p.y} } outside boundary`);
    }
    if (this.points.length >= this.k) {
      this.subdivide();
      for (let i = 0; i < this.quadrants!.length; i++) {
        if (this.quadrants![i].boundary.contains(p)) {
          this.quadrants![i].addPoint(p);
        }
      }
    } else {
      this.points.push(p);
    }
  }

  getPoints(): Vector2[] {
    return [...this.points];
  }

  getQuadrants(): [QuadTree, QuadTree, QuadTree, QuadTree] | undefined {
    if (this.quadrants) {
      return [...this.quadrants];
    } else {
      return undefined;
    }
  }

  subdivide(): void {
    if (this.quadrants) {
      return;
    }
    const { o, w, h } = this.boundary;
    this.quadrants = [
      new QuadTree(this.k, new Rect(o, w * 0.5, h * 0.5)),
      new QuadTree(
        this.k,
        new Rect(o.add(new Vector2([w * 0.5, 0])), w * 0.5, h * 0.5),
      ),
      new QuadTree(
        this.k,
        new Rect(o.add(new Vector2([w * 0.5, h * 0.5])), w * 0.5, h * 0.5),
      ),
      new QuadTree(
        this.k,
        new Rect(o.add(new Vector2([0, h * 0.5])), w * 0.5, h * 0.5)
      ),
    ];
  }

  query(area: Area): Vector2[] {
    let found: Vector2[] = [];
    if (!this.boundary.intersects(area)) {
      return found;
    }

    this.points.forEach((p) => {
      if (area.contains(p)) {
        found.push(p);
      }
    });

    if (this.quadrants) {
      this.quadrants.forEach((q) => {
        found = found.concat(q.query(area));
      });
    }

    return found;
  }
}
