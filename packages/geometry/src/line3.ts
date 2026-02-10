import { Vector3 } from "@rgsoft/linear";

export class Line3 {
  readonly point: Vector3;
  readonly direction: Vector3;

  constructor(point: Vector3, direction: Vector3) {
    if (direction.isZero) {
      throw new Error("Direction vector cannot be zero.");
    }
    this.point = point;
    this.direction = direction;
  }

  /**
   * Point at parameter t
   */
  at(t: number): Vector3 {
    return this.point.add(this.direction.mult(t));
  }

  /**
   * Point proyection onto the line
   */
  project(point: Vector3): Vector3 {
    const w = point.sub(this.point);
    const t = w.dot(this.direction) / this.direction.dot(this.direction);
    return this.at(t);
  }

  /**
   * Returns the parameter t of the projection of the point onto the line
   */
  projectT(point: Vector3): number {
    const w = point.sub(this.point);
    return w.dot(this.direction) / this.direction.dot(this.direction);
  }

  /**
   * Distance betweer the line and a point
   */
  distanceToPoint(point: Vector3): number {
    const w = point.sub(this.point);
    const cross = w.cross(this.direction);
    return cross.mag / this.direction.mag;
  }

  /**
   * Distance between this line and another line
   */
  distanceToLine(other: Line3): number {
    const n = this.direction.cross(other.direction);

    if (n.isZero) {
      // Parallel lines
      return this.distanceToPoint(other.point);
    }

    const w = other.point.sub(this.point);
    return Math.abs(w.dot(n)) / n.mag;
  }

  /**
   * Returns true if this line is parallel to the other line
   */
  isParallelTo(other: Line3): boolean {
    return this.direction.cross(other.direction).isZero;
  }

  toString(): string {
    const p = this.point;
    const d = this.direction;
    return `(x, y, z) = (${p.x}, ${p.y}, ${p.z}) + t(${d.x}, ${d.y}, ${d.z})`;
  }
}
