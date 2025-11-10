import { Vector } from "./vector";

export class Vector3 extends Vector {
  public readonly azimuth: number;
  public readonly polar: number;
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;

  constructor(values: [number, number, number]) {
    super(values);
    if (values.length !== 3) {
      throw new Error("Values must contain two elements");
    }
    this.x = values[0];
    this.y = values[1];
    this.z = values[2];
    this.azimuth = Math.atan2(this.y, this.x);
    this.polar = Math.atan2(Math.sqrt(this.x ** 2 + this.y ** 2), this.z);
  }

  /**
   *
   * @param { number } angle
   * @returns { Vector3 }
   */
  rotateX(angle: number): Vector3 {
    const x = this.x;
    const y = this.y * Math.cos(angle) - this.z * Math.sin(angle);
    const z = this.y * Math.sin(angle) + this.z * Math.cos(angle);
    return new Vector3([x, y, z]);
  }

  /**
   *
   * @param { number } angle
   * @returns { Vector3 }
   */
  rotateY(angle: number): Vector3 {
    const x = this.x * Math.cos(angle) + this.z * Math.sin(angle);
    const y = this.y;
    const z = -this.x * Math.sin(angle) + this.z * Math.cos(angle);
    return new Vector3([x, y, z]);
  }

  /**
   *
   * @param { number } angle
   * @returns { Vector3 }
   */
  rotateZ(angle: number): Vector3 {
    const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    const z = this.z;
    return new Vector3([x, y, z]);
  }

  /**
   * Calculates the cross product with another vector
   * @param { Vector3 } v
   * @returns { Vector3 }
   */
  cross(v: Vector3): Vector3 {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vector3([x, y, z]);
  }

  /**
   * Creates a 3D vector from spherical coordinates
   * @param {number} theta - polar angle from the positive Z axis
   * @param {number} phi - azimuthal angle from the positive X axis in the XY plane
   * @param {number} r - magnitude (defaults to 1)
   */
  static fromSpherical(theta: number, phi: number, r: number = 1): Vector3 {
    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta);
    return new Vector3([x, y, z]);
  }
}
