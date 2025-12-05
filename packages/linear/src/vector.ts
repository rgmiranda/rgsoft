import { EPSILON } from "@rgsoft/math";

export class Vector {
  private _mag?: number;
  private readonly _values: number[];
  private static _zeros = new Map<number, Vector>();

  /**
   *
   * @param { number[] } values
   */
  constructor(values: number[]) {
    this._values = [...values];
  }

  get dim(): number {
    return this.values.length;
  }

  get mag(): number {
    if (!this._mag) {
      this._mag = Math.sqrt(
        this._values.reduce((prev, curr) => prev + curr * curr, 0)
      );
    }
    return this._mag;
  }

  /**
   * Returns the zero vector of the same subclass and dimension.
   */
  static getZero(dim: number): Vector {
    let zero = this._zeros.get(dim);

    if (!zero) {
      zero = new this(Array(dim).fill(0)); // respeta subclases
      this._zeros.set(dim, zero);
    }

    return zero;
  }

  /**
   * Determines if the vector is a zero vector.
   */
  get isZero(): boolean {
    return (
      this._values.reduce((prev, curr) => prev + curr * curr, 0) <=
      EPSILON * EPSILON
    );
  }

  /**
   * @returns { number[] }
   */
  get values(): number[] {
    return [...this._values];
  }

  /**
   * @returns { number }
   */
  at(i: number): number {
    if (!Number.isInteger(i)) {
      throw new Error("Index must be an integer");
    }
    if (i < 0 || i > this._values.length) {
      throw new Error("Index out of range");
    }
    return this._values[i];
  }

  normalize(): this {
    if (this.mag === 0) {
      return this;
    }
    const values = this._values.map((e) => e / this.mag);
    return new (this.constructor as new (v: number[]) => this)(values);
  }

  mult(num: number): this {
    const values = this._values.map((e) => e * num);
    return new (this.constructor as new (v: number[]) => this)(values);
  }

  div(num: number): this {
    const values = this._values.map((e) => e / num);
    return new (this.constructor as new (v: number[]) => this)(values);
  }

  dot(v: this): number {
    if (this.dim !== v.dim) {
      throw new Error("Dimension mismatch");
    }
    return this.values.reduce((sum, e, i) => sum + e * v.at(i), 0);
  }

  add(v: this): this {
    if (this.dim !== v.dim) {
      throw new Error("Dimension mismatch");
    }
    const values = this._values.map((e, i) => e + v.at(i));
    return new (this.constructor as new (v: number[]) => this)(values);
  }

  sub(v: this): this {
    if (this.dim !== v.dim) {
      throw new Error("Dimension mismatch");
    }
    const values = this._values.map((e, i) => e - v.at(i));
    return new (this.constructor as new (v: number[]) => this)(values);
  }

  dist(v: this): number {
    if (this.dim !== v.dim) {
      throw new Error("Dimension mismatch");
    }
    const dists = this._values.map((e, i) => e - v.at(i));
    return Math.sqrt(dists.reduce((prev, curr) => prev + curr * curr, 0));
  }

  equals(v: this, epsilon = EPSILON): boolean {
    const dists = this._values.map((e, i) => e - v.at(i));
    return (
      dists.reduce((prev, curr) => prev + curr * curr, 0) <= epsilon * epsilon
    );
  }

  clone(): this {
    return new (this.constructor as new (v: number[]) => this)(this.values);
  }

  /**
   * Calculates the projection on another vector
   * @param { this } onto
   * @returns { this }
   */
  projection(onto: this): this {
    const dp = this.dot(onto);
    const denom = onto.dot(onto);
    if (denom === 0) {
      return Vector.getZero(this.dim) as this;
    }
    return onto.mult(dp / denom);
  }

  /**
   * Calculates the angle to another vector
   * @param { this } v
   * @returns { number }
   */
  angleTo(v: this): number {
    const dp = this.dot(v);
    const denom = this.mag * v.mag;
    if (denom === 0) {
      throw new Error("Cannot compute angle with a zero vector");
    }
    return Math.acos(dp / denom);
  }

  /**
   *
   * @param { number } mag
   */
  limit(mag: number) {
    if (mag < 0) {
      throw new Error("Magnitude cannot be negative");
    }
    if (this.mag <= mag) {
      return this.clone();
    }
    return this.normalize().mult(mag);
  }
}
