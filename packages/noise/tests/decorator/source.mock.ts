import { Noise } from "../../src";
const values: number[] = [
  0.192227234, 0.50198629, 0.695408598, 0.855150113, 0.226191309, 0.643787047,
  0.391071214, 0.717763781, 0.394971323, 0.221668278, 0.230044817, 0.488183827,
  0.321458827, 0.646997162, 0.86646439, 0.810226338, 0.52299681, 0.647737858,
  0.113147023, 0.737058908, 0.00000124, 0.241697553, 0.67892125, 0.99999998,
];
let i = 0;

export const sourceMock: Noise = {

  range: [0, 1],

  noise1: function (x: number): number {
    i = (i + 1) % values.length;
    return values[i];
  },
  noise2: function (x: number, y: number): number {
    i = (i + 1) % values.length;
    return values[i];
  },
  noise3: function (x: number, y: number, z: number): number {
    i = (i + 1) % values.length;
    return values[i];
  },
  noise4: function (x: number, y: number, z: number, w: number): number {
    i = (i + 1) % values.length;
    return values[i];
  },
};
