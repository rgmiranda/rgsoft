import { EPSILON } from "@rgsoft/math";
import { Line2 } from "./line2";
import { Vector2, getOrientation } from "@rgsoft/linear";

export class Segment2 {
  public readonly length: number;
  public readonly midpoint: Vector2;
  public readonly direction: Vector2;

  constructor(
    public readonly start: Vector2,
    public readonly end: Vector2,
  ) {
    const diff = end.sub(start);
    this.length = diff.mag;
    this.midpoint = start.add(end).mult(0.5);
    this.direction = diff.mag === 0 ? diff : diff.normalize();
  }

  /**
   *
   * @param { Vector2 } r
   * @param { number } tolerance
   * @returns { boolean }
   */
  contains(r: Vector2, tolerance: number = EPSILON): boolean {
    const cross =
      (this.end.x - this.start.x) * (r.y - this.start.y) -
      (this.end.y - this.start.y) * (r.x - this.start.x);
    if (Math.abs(cross) > tolerance) {
      return false;
    }

    const withinX =
      r.x <= Math.max(this.start.x, this.end.x) + tolerance &&
      r.x >= Math.min(this.start.x, this.end.x) - tolerance;
    const withinY =
      r.y <= Math.max(this.start.y, this.end.y) + tolerance &&
      r.y >= Math.min(this.start.y, this.end.y) - tolerance;

    return withinX && withinY;
  }

  /**
   *
   * Returns true if intersects with this segment
   *
   * @param { Segment2 } segment
   * @returns { boolean }
   */
  intersects(segment: Segment2): boolean {
    // Find the four orientations needed for general and
    // special cases
    let o1 = getOrientation(this.start, this.end, segment.start);
    let o2 = getOrientation(this.start, this.end, segment.end);
    let o3 = getOrientation(segment.start, segment.end, this.start);
    let o4 = getOrientation(segment.start, segment.end, this.end);

    // General case
    if (o1 != o2 && o3 != o4) {
      return true;
    }

    // Special Cases
    // The first point of the segemnt lies on this segment
    if (o1 == 0 && this.contains(segment.start)) {
      return true;
    }

    // The second point of the segemnt lies on this segment
    if (o2 == 0 && this.contains(segment.end)) {
      return true;
    }

    // The first point of this segments lies on the other segment
    if (o3 == 0 && segment.contains(this.start)) {
      return true;
    }

    // The second point of this segments lies on the other segment
    if (o4 == 0 && segment.contains(this.end)) {
      return true;
    }

    return false; // Doesn't fall in any of the above cases
  }

  toLine(): Line2 {
    return Line2.fromPoints(this.start, this.end);
  }

  closestPointTo(p: Vector2): Vector2 {
    const ab = this.end.sub(this.start);
    const ap = p.sub(this.start);

    const denom = ab.dot(ab);

    if (denom === 0) {
      return this.start;
    }

    let t = ap.dot(ab) / denom;
    t = Math.max(0, Math.min(1, t));

    return this.start.add(ab.mult(t));
  }

  distanceToPoint(p: Vector2): number {
    return p.sub(this.closestPointTo(p)).mag;
  }
}
