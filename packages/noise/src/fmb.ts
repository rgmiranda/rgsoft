import { Noise } from "./noise";

export class FMB extends Noise {
  constructor(
    private readonly noise: Noise,
    private readonly octaves = 1,
    private readonly lacunarity = 2,
    private readonly gain = 0.5,
  ) {
    super();
  }

  public noise1(x: number): number {
    let sum = 0;
    let amp = 1;
    let freq = 1;
    let norm = 0;
    for (let octave = 0; octave < this.octaves; octave++) {
      sum += this.noise.noise1(x * freq) * amp;
      freq *= this.lacunarity;
      amp *= this.gain;
      norm += amp;
    }
    return sum / norm;
  }

  public noise2(x: number, y: number): number {
    let sum = 0;
    let amp = 1;
    let freq = 1;
    let norm = 0;
    for (let octave = 0; octave < this.octaves; octave++) {
      sum += this.noise.noise2(x * freq, y * freq) * amp;
      freq *= this.lacunarity;
      amp *= this.gain;
      norm += amp;
    }
    return sum / norm;
  }

  public noise3(x: number, y: number, z: number): number {
    let sum = 0;
    let amp = 1;
    let freq = 1;
    let norm = 0;
    for (let octave = 0; octave < this.octaves; octave++) {
      sum += this.noise.noise3(x * freq, y * freq, z * freq) * amp;
      freq *= this.lacunarity;
      amp *= this.gain;
      norm += amp;
    }
    return sum / norm;
  }
}
