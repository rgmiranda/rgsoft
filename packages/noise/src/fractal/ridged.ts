import { Fractal } from "./fractal";

export class Ridged extends Fractal {

  protected transform(x: number) {
    return 1 - Math.abs(x);
  }

}
