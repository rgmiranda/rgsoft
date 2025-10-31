import { Distribution } from "../distribution";

export interface PMF extends Distribution {
  probability(x: number): number;
}
