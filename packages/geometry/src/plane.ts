import { Vector3 } from "@rgsoft/linear";
import { EPSILON } from "@rgsoft/math";
import { Line3 } from "./line3";

export class Plane {
  /**
   * Plane normal (always normalized).
   */
  public readonly normal: Vector3;

  /**
   * Constant term d in the equation: n·x + d = 0.
   */
  public readonly d: number;

  /**
   * Creates an instanca from a normal vector and a number d.
   */
  constructor(normal: Vector3, d: number) {
    this.normal = normal.normalize();
    this.d = d;
  }

  /**
   * Creates a plane from a normal vector and a point contained in the plane.
   * Equation: n·p + d = 0 => d = -n·p.
   */
  static fromPointNormal(point: Vector3, normal: Vector3): Plane {
    const n = normal.normalize();
    const d = -n.dot(point);
    return new Plane(n, d);
  }

  /**
   * Creates a plane from 3 non-collinear points.
   */
  static fromPoints(p1: Vector3, p2: Vector3, p3: Vector3): Plane {
    const u = p2.sub(p1);
    const v = p3.sub(p1);

    const n = u.cross(v);

    return Plane.fromPointNormal(p1, n);
  }

  /**
   * Distance from a given point to the plane.
   * Can be positive or negative according to the points position.
   */
  distanceToPoint(point: Vector3): number {
    return this.normal.dot(point) + this.d;
  }

  /**
   * Normal proyection of a point onto the plane.
   */
  projectPoint(point: Vector3): Vector3 {
    const dist = this.distanceToPoint(point);
    return point.sub(this.normal.mult(dist));
  }

  /**
   * Intersection point with a line.
   * If the line is parallel, `null` is returned.
   */
  intersectLine(line: Line3): Vector3 | null {
    const denom = this.normal.dot(line.direction);
    if (Math.abs(denom) < EPSILON) {
      return null;
    }
    const t = -(this.normal.dot(line.point) + this.d) / denom;
    return line.point.add(line.direction.mult(t));
  }

  /**
   * General equation: `Ax + By + Cz + D = 0`
   */
  toGeneralForm(): { A: number; B: number; C: number; D: number } {
    return {
      A: this.normal.x,
      B: this.normal.y,
      C: this.normal.z,
      D: this.d,
    };
  }

  /**
   * Normal-point form
   */
  toPointNormal(): { point: Vector3; normal: Vector3 } {
    const n = this.normal;
    let point: Vector3;
    if (Math.abs(n.x) >= Math.abs(n.y) && Math.abs(n.x) >= Math.abs(n.z)) {
      point = new Vector3([-this.d / n.x, 0, 0]);
    } else if (Math.abs(n.y) >= Math.abs(n.z)) {
      point = new Vector3([0, -this.d / n.y, 0]);
    } else {
      point = new Vector3([0, 0, -this.d / n.z]);
    }
    return { point, normal: this.normal };
  }
}
