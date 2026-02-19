import { Vector2 } from "@rgsoft/linear";
import { Line2 } from "./line2";
import { Area } from "./area";
import { Point } from "./point";

export class Triangle implements Area {

  public readonly center: Vector2;

  public readonly radius: number;

  constructor(public readonly a: Vector2, public readonly b: Vector2, public readonly c: Vector2) {
    const med1 = Line2.mediatrix(a, b);
    const med2 = Line2.mediatrix(b, c);

    if (med1.direction.equals(med2.direction)) {
      throw new Error("The points are colinear");
    }

    this.center = med1.intersectionPoint(med2);
    this.radius = Math.sqrt((this.a.x - this.center.x) * (this.a.x - this.center.x) + (this.a.y - this.center.y) * (this.a.y - this.center.y))
  }
  contains(p: Point): boolean {
    throw new Error("Method not implemented.");
  }
  intersects(area: Area): boolean {
    throw new Error("Method not implemented.");
  }

  inCircle(point: Vector2): boolean {
    const d = (point.x - this.center.x) * (point.x - this.center.x) + (point.y - this.center.y) * (point.y - this.center.y);
    return d < this.radius * this.radius;
  }

  hasEdge(a: Vector2, b: Vector2): boolean {

    if (this.a.equals(a)) {
      if (this.b.equals(b) || this.c.equals(b)) {
        return true
      } else {
        return false;
      }
    } else if (this.b.equals(a)) {
      if (this.a.equals(b) || this.c.equals(b)) {
        return true
      } else {
        return false;
      }
    } else if (this.c.equals(a)) {
      if (this.a.equals(b) || this.b.equals(b)) {
        return true
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  hasVertex(v: Vector2): boolean {
    return this.a.equals(v) || this.b.equals(v) || this.c.equals(v);
  }

  isAdjacent(triangle: Triangle): boolean {
    let matchingVertex = 0;
    [
      [ triangle.a, this.a ],
      [ triangle.a, this.b ],
      [ triangle.a, this.c ],
      [ triangle.b, this.a ],
      [ triangle.b, this.b ],
      [ triangle.b, this.c ],
      [ triangle.c, this.a ],
      [ triangle.c, this.b ],
      [ triangle.c, this.c ],
    ].forEach( ([v1, v2]) => {
      matchingVertex += (v1.x === v2.x && v1.y === v2.y) ? 1 : 0}
    );
    return matchingVertex === 2;
  }

}
