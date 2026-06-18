import { NoiseDecorator } from "../decorator/noise-decorator";
import { Noise } from "../noise";

export abstract class Fractal extends NoiseDecorator {
  protected abstract transform(x: number): number;

  constructor(
    private readonly noise: Noise,
    private readonly octaves = 1,
    private readonly lacunarity = 2,
    private readonly gain = 0.5,
  ) {
    super(noise);
    if (octaves < 1) {
      throw new Error("Octaves must be greater than or equal to 1");
    }
  }

  private sum(sample: (frequency: number) => number): number {
    let sum = 0;
    let norm = 0;

    let amp = 1;
    let freq = 1;

    for (let octave = 0; octave < this.octaves; octave++) {
      const value = this.transform(sample(freq));
      sum += value * amp;
      norm += amp;

      freq *= this.lacunarity;
      amp *= this.gain;
    }

    return sum / norm;
  }

  public noise1(x: number): number {
    return this.sum((frequency) => this.noise.noise1(x * frequency));
  }

  public noise2(x: number, y: number): number {
    return this.sum((frequency) =>
      this.noise.noise2(x * frequency, y * frequency),
    );
  }

  public noise3(x: number, y: number, z: number): number {
    return this.sum((frequency) =>
      this.noise.noise3(x * frequency, y * frequency, z * frequency),
    );
  }
}
