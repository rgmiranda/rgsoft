import { HALF_PI, PI } from "@rgsoft/math";
import { Vector } from "./vector";
import { V2_ZERO } from "./constants";

export class Vector2 extends Vector {
  public readonly angle: number;
  public readonly x: number;
  public readonly y: number;

  constructor(values: [number, number]) {
    super(values);
    if (values.length !== 2) {
      throw new Error("Must contain two elements");
    }
    this.x = values[0];
    this.y = values[1];
    if (this.mag > 0) {
      this.angle = Math.atan2(this.y, this.x);
    } else {
      this.angle = 0;
    }
  }

  static getZero(): Vector2 {
    return V2_ZERO;
  }

  /**
   * Rotates the vector by angle
   * @param { number } angle
   * @returns { Vector2 }
   */
  rotate(angle: number): Vector2 {
    let x: number, y: number;
    if (angle === 0) {
      x = this.x;
      y = this.y;
    } else if (angle === HALF_PI) {
      x = -this.y;
      y = this.x;
    } else if (angle === -HALF_PI) {
      x = this.y;
      y = -this.x;
    } else if (angle === PI) {
      x = -this.x;
      y = -this.y;
    } else {
      x = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
      y = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
    }
    return new Vector2([x, y]);
  }

  /**
   *
   * @param { number } angle
   * @returns { Vector2 }
   */
  static fromAngle(angle: number, radius: number = 1): Vector2 {
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    const instance = new Vector2([x, y]);
    return instance;
  }

  cross(v: Vector2): number {
    return this.x * v.y - v.x * this.y;
  }
}
