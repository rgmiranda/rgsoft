export abstract class Noise {

  public abstract noise1(x: number): number

  public abstract noise2(x: number, y: number): number;

  public abstract noise3(x: number, y: number, z: number): number;
}
