import { Vector2 } from "@rgsoft/linear";
import { approximateTo, EPSILON, HALF_PI } from "@rgsoft/math";

export class Line2 {
  readonly a: number;
  readonly b: number;
  readonly c: number;
  readonly point: Vector2;
  readonly direction: Vector2;
  readonly normal: Vector2;

  constructor(point: Vector2, direction: Vector2) {
    if (direction.isZero) {
      throw new Error("Direction vector cannot be zero.");
    }
    this.point = point;
    this.direction = direction.normalize();
    this.normal = new Vector2([-this.direction.y, this.direction.x]);
    this.a = approximateTo(direction.y);
    this.b = approximateTo(-direction.x);
    this.c = approximateTo(-(this.a * point.x + this.b * point.y));
  }

  static fromPoints(p: Vector2, q: Vector2): Line2 {
    const direction = q.sub(p);
    return new Line2(p, direction);
  }

  static mediatrix(p: Vector2, q: Vector2): Line2 {
    const point = p.add(q).mult(0.5);
    const direction = p.sub(q).rotate(HALF_PI);
    return new Line2(point, direction);
  }

  intersectionPoint(line: Line2): Vector2 {
    const n2 = line.normal;
    const p1 = this.point;
    const p2 = line.point;
    const d1 = this.direction;

    const denom = n2.dot(d1);

    if (approximateTo(denom) === 0) {
      throw new Error("Lines are parallel or coincident");
    }

    const t = n2.dot(p2.sub(p1)) / denom;
    return p1.add(d1.mult(t));
  }

  containsPoint(p: Vector2, tolerance = EPSILON): boolean {
    return Math.abs(this.a * p.x + this.b * p.y + this.c) < tolerance;
  }

  get slope(): number {
    return this.b === 0 ? NaN : approximateTo(-this.a / this.b);
  }

  get yIntercept(): number | null {
    return this.b === 0 ? null : approximateTo(-this.c / this.b);
  }

  get xIntercept(): number | null {
    return this.a === 0 ? null : approximateTo(-this.c / this.a);
  }

  get yInterceptPoint(): Vector2 | null {
    const y = this.yIntercept;
    return y === null ? null : new Vector2([0, y]);
  }

  get xInterceptPoint(): Vector2 | null {
    const x = this.xIntercept;
    return x === null ? null : new Vector2([x, 0]);
  }

  distanceToPoint(p: Vector2): number {
    return Math.abs(p.sub(this.point).dot(this.normal));
  }

  projectPoint(p: Vector2): Vector2 {
    const diff = this.point.sub(p);
    const proj = diff.projection(this.normal);
    return p.add(proj);
  }

  toString(): string {
    return `${this.a}x + ${this.b}y + ${this.c} = 0`;
  }
}
