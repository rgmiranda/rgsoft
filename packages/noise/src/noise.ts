export abstract class Noise {

  protected abstract _noise1(x: number): number

  protected abstract _noise2(x: number, y: number): number;

  protected abstract _noise3(x: number, y: number, z: number): number;


  public noise1(x: number, frequency = 1, amplitude = 1): number {
    return this._noise1(x * frequency) * amplitude;
  }

  public noise2(x: number, y: number, frequency = 1, amplitude = 1): number {
    return this._noise2(x * frequency, y * frequency) * amplitude;
  }

  public noise3(
    x: number,
    y: number,
    z: number,
    frequency = 1,
    amplitude = 1,
  ): number {
    return this._noise3(x * frequency, y * frequency, z * frequency) * amplitude;
  }
}
