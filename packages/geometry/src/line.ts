import { Vector2 } from "@rgsoft/linear";
import { EPSILON } from "@rgsoft/math";

export class Line {

  constructor(
    public readonly a: number,
    public readonly b: number,
    public readonly c: number
  ) {}

  private static normalizeZero(n: number): number {
    return Math.abs(n) < EPSILON ? 0 : n;
  }

  static fromPoints(p: Vector2, q: Vector2): Line {
    const a = Line.normalizeZero(p.y - q.y);
    const b = Line.normalizeZero(q.x - p.x);
    const c = Line.normalizeZero(p.x * q.y - q.x * p.y);
    return new Line(a, b, c);
  }

  static mediatrix(p: Vector2, q: Vector2): Line {
    const mid = p.add(q).mult(0.5);
    const dx = q.x - p.x;
    const dy = q.y - p.y;

    // Perpendicular slope => (-dy, dx)
    const a = Line.normalizeZero(-dx);
    const b = Line.normalizeZero(-dy);
    const c = Line.normalizeZero(-(a * mid.x + b * mid.y));
    return new Line(a, b, c);
  }

  intersectionPoint(line: Line): Vector2 {
    const det = this.a * line.b - line.a * this.b;
    if (Math.abs(det) < 1e-10) {
      throw new Error("Lines are parallel or coincident");
    }

    const x = (this.b * line.c - line.b * this.c) / det;
    const y = (line.a * this.c - this.a * line.c) / det;
    return new Vector2([x, y]);
  }

  containsPoint(p: Vector2, tolerance = EPSILON): boolean {
    return Math.abs(this.a * p.x + this.b * p.y + this.c) < tolerance;
  }

  get slope(): number {
    return this.b === 0 ? NaN : Line.normalizeZero(-this.a / this.b);
  }

  get yIntercept(): number | null {
    return this.b === 0 ? null : Line.normalizeZero(-this.c / this.b);
  }

  get xIntercept(): number | null {
    return this.a === 0 ? null : Line.normalizeZero(-this.c / this.a);
  }

  get yInterceptPoint(): Vector2 | null {
    const y = this.yIntercept;
    return y === null ? null : new Vector2([0, y]);
  }

  get xInterceptPoint(): Vector2 | null {
    const x = this.xIntercept;
    return x === null ? null : new Vector2([x, 0]);
  }

  toString(): string {
    return `${this.a}x + ${this.b}y + ${this.c} = 0`;
  }
}
