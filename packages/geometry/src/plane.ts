import { Vector3 } from "@rgsoft/linear";

export class Plane {
  /**
   * Plane normal (always normalized)
   */
  public readonly normal: Vector3;

  /**
   * Constant term d in the equation: n·x + d = 0
   */
  public readonly d: number;

  /**
   * Creates an instanca from a normal vector and a number d
   */
  constructor(normal: Vector3, d: number) {
    this.normal = normal.normalize();
    this.d = d;
  }

  /**
   * Construye un plano a partir de una normal y un punto contenido en el plano.
   * Ecuación: n·p + d = 0 => d = -n·p
   */
  static fromPointNormal(point: Vector3, normal: Vector3): Plane {
    const n = normal.normalize();
    const d = -n.dot(point);
    return new Plane(n, d);
  }

  /**
   * Construye un plano a partir de 3 puntos no colineales.
   * Obtiene la normal usando el producto cruzado.
   */
  static fromPoints(p1: Vector3, p2: Vector3, p3: Vector3): Plane {
    const u = p2.sub(p1);
    const v = p3.sub(p1);

    const n = u.cross(v);

    return Plane.fromPointNormal(p1, n);
  }

  /**
   * Distancia desde un punto al plano.
   * Positiva, negativa o cero según el lado del plano.
   */
  distanceToPoint(point: Vector3): number {
    return this.normal.dot(point) + this.d;
  }

  /**
   * Proyecta un punto sobre el plano.
   */
  projectPoint(point: Vector3): Vector3 {
    const dist = this.distanceToPoint(point);
    return point.sub(this.normal.mult(dist));
  }

  /**
   * Intersección con una línea descrita por:
   * - punto base `p0`
   * - vector dirección `dir`
   *
   * Si la línea es paralela → retorna null.
   */
  intersectLine(p0: Vector3, dir: Vector3): Vector3 | null {
    const denom = this.normal.dot(dir);
    if (Math.abs(denom) < 1e-12) {
      return null; // Paralela o contenida
    }
    const t = -(this.normal.dot(p0) + this.d) / denom;
    return p0.add(dir.mult(t));
  }

  /**
   * Retorna una representación en forma:
   * Ax + By + Cz + D = 0
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
   * Retorna representación punto-normal:
   * Un punto cualquiera contenido en el plano + normal
   */
  toPointNormal(): { point: Vector3; normal: Vector3 } {
    // Tomamos algún punto sobre el plano:
    // Resolver: n·x = -d
    const n = this.normal;
    // Elegimos el eje dominante para evitar divisiones pequeñas
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
