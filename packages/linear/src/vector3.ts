import { V3_ZERO } from "./constants";

export class Vector3 {
  private _x: number;
  private _y: number;
  private _z: number;
  private _mag?: number;
  private _azimuth?: number;
  private _polar?: number;

  /**
   *
   * @param { number } x
   * @param { number } y
   */
  constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
    this.resetValues();
  }

  private resetValues() {
    this._mag = undefined;
    this._azimuth = undefined;
    this._polar = undefined;
  }

  /**
   * @returns { number }
   */
  get mag(): number {
    if (this._mag === undefined) {
      this._mag = Math.sqrt(
        this._x * this._x + this._y * this._y + this._z * this._z
      );
    }
    return this._mag;
  }

  /**
   * @param { number } value
   */
  set mag(value: number) {
    if (value < 0) {
      throw new Error("New magnitude must be positive");
    }
    this.normalize();
    this.mult(value);
    this._mag = value;
  }

  /**
   * @returns { number }
   */
  get azimuth(): number {
    if (!this._azimuth) {
      this._azimuth = Math.atan2(this._y, this._x);
    }
    return this._azimuth;
  }

  /**
   * @returns { number }
   */
  get polar(): number {
    if (!this._polar) {
      this._polar = Math.atan2(Math.sqrt(this._x ** 2 + this._y ** 2), this._z);
    }
    return this._polar;
  }

  /**
   * @returns { number }
   */
  get x(): number {
    return this._x;
  }

  /**
   * @param { number } value
   */
  set x(value: number) {
    this._x = value;
    this.resetValues();
  }

  /**
   * @returns { number }
   */
  get y(): number {
    return this._y;
  }

  /**
   * @param { number } value
   */
  set y(value: number) {
    this._y = value;
    this.resetValues();
  }

  /**
   * @returns { number }
   */
  get z(): number {
    return this._z;
  }

  /**
   * @param { number } value
   */
  set z(value: number) {
    this._z = value;
    this.resetValues();
  }

  /**
   *
   * @returns { Vector3 }
   */
  normalize(): Vector3 {
    if (this.mag === 0) {
      return this;
    }
    this._x /= this.mag;
    this._y /= this.mag;
    this._z /= this.mag;
    this.resetValues();
    return this;
  }

  /**
   *
   * @param { number} num
   * @returns { Vector3 }
   */
  mult(num: number): Vector3 {
    this._x *= num;
    this._y *= num;
    this._z *= num;
    this.resetValues();
    return this;
  }

  /**
   *
   * @param { number} num
   * @returns { Vector3 }
   */
  div(num: number): Vector3 {
    this._x /= num;
    this._y /= num;
    this._z /= num;
    this.resetValues();
    return this;
  }

  /**
   * @param {Vector3} v
   * @returns {number}
   */
  dot(v: Vector3): number {
    return this._x * v._x + this._y * v._y + this._z * v._z;
  }

  /**
   *
   * @param { Vector3 } vector
   * @returns { Vector3 }
   */
  add(vector: Vector3): Vector3 {
    this._x += vector._x;
    this._y += vector._y;
    this._z += vector._z;
    this.resetValues();
    return this;
  }

  /**
   *
   * @param { Vector3 } vector
   * @returns { Vector3 }
   */
  sub(vector: Vector3): Vector3 {
    this._x -= vector._x;
    this._y -= vector._y;
    this._z -= vector._z;
    this.resetValues();
    return this;
  }

  /**
   *
   * @param { Vector3 } vector
   * @returns { number }
   */
  dist(vector: Vector3): number {
    const dx = this._x - vector._x;
    const dy = this._y - vector._y;
    const dz = this._z - vector._z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  /**
   *
   * @param { Vector3 } vector
   * @returns { boolean }
   */
  equals(vector: Vector3): boolean {
    return (
      vector._x === this._x && vector._y === this.y && vector._z === this._z
    );
  }

  /**
   *
   * @param { Vector3 } vector
   * @returns { number }
   */
  angleTo(vector: Vector3): number {
    const denom = this.mag * vector.mag;
    const dp = this.dot(vector);
    if (denom === 0) {
      return NaN;
    }
    const cosTheta = Math.min(1, Math.max(-1, dp / denom));
    return Math.acos(cosTheta);
  }

  /**
   * Calculates the projection on another vector
   * @param { Vector3 } onto
   * @returns { Vector3 }
   */
  projection(onto: Vector3): Vector3 {
    const dp = this.dot(onto);
    const denom = onto.dot(onto);
    if (denom === 0) {
      return V3_ZERO.copy();
    }
    const proj = onto.copy();
    proj.mult(dp / denom);
    return proj;
  }

  /**
   * @returns { Vector3 }
   */
  copy(): Vector3 {
    return new Vector3(this._x, this._y, this._z);
  }

  /**
   * 
   * @param { number } angle 
   * @returns { Vector3 }
   */
  rotateX(angle: number): Vector3 {
    const y = this._y * Math.cos(angle) - this._z * Math.sin(angle);
    const z = this._y * Math.sin(angle) + this._z * Math.cos(angle);
    this._y = y;
    this._z = z;
    this.resetValues();
    return this;
  }

  /**
   * 
   * @param { number } angle 
   * @returns { Vector3 }
   */
  rotateY(angle: number): Vector3 {
    const x = this._x * Math.cos(angle) + this._z * Math.sin(angle);
    const z = -this._x * Math.sin(angle) + this._z * Math.cos(angle);
    this._x = x;
    this._z = z;
    this.resetValues();
    return this;
  }

  /**
   * 
   * @param { number } angle 
   * @returns { Vector3 }
   */
  rotateZ(angle: number): Vector3 {
    const x = this._x * Math.cos(angle) - this._y * Math.sin(angle);
    const y = this._x * Math.sin(angle) + this._y * Math.cos(angle);
    this._x = x;
    this._y = y;
    this.resetValues();
    return this;
  }

  /**
   *
   * @param { number } mag
   */
  limit(mag: number) {
    if (this.mag <= mag) {
      return;
    }
    this.mag = mag;
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
    return new Vector3(x, y, z);
  }

  /**
   *
   * @param { Vector3 } v
   * @param { Vector3 } w
   * @returns { Vector3 }
   */
  static add(v: Vector3, w: Vector3): Vector3 {
    const instance = v.copy();
    return instance.add(w);
  }

  /**
   *
   * @param { Vector3 } v
   * @param { Vector3 } w
   * @returns { Vector3 }
   */
  static sub(v: Vector3, w: Vector3): Vector3 {
    const instance = v.copy();
    return instance.sub(w);
  }

  /**
   *
   * @param { Vector3 } v
   * @param { number } n
   * @returns { Vector3 }
   */
  static mult(v: Vector3, n: number): Vector3 {
    const instance = v.copy();
    return instance.mult(n);
  }

  /**
   *
   * @param { Vector3 } v
   * @param { number } n
   * @returns { Vector3 }
   */
  static div(v: Vector3, n: number): Vector3 {
    const instance = v.copy();
    return instance.div(n);
  }
}
