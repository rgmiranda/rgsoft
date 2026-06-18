import { Fractal } from "./fractal";

export class Turbulence extends Fractal {

  protected transform(x: number) {
    return Math.abs(x);
  }

}
