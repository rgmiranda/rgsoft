export class Stats {
  private readonly orderedData: number[];
  private readonly data: number[];

  private _mean?: number;
  private _variance?: number;
  private _stdDev?: number;
  private _q1?: number;
  private _q2?: number;
  private _q3?: number;
  private _normalized?: number[];
  private _zScores?: number[];

  constructor(data: number[]) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Data must be an array of numbers');
    }
    this.data = [...data];
    this.orderedData = [...data].sort((a, b) => a - b);
  }

  get mean(): number {
    if (this._mean === undefined) {
      this._mean = this.orderedData.reduce((a, b) => a + b, 0) / this.orderedData.length;
    }
    return this._mean;
  }

  get median(): number {
    return this.q2;
  }

  get variance(): number {
    if (this._variance === undefined) {
      this._variance =
        this.orderedData.reduce((a, b) => a + (b - this.mean) ** 2, 0) /
        this.orderedData.length;
    }
    return this._variance;
  }

  get stdDev(): number {
    if (this._stdDev === undefined) {
      this._stdDev = Math.sqrt(this.variance);
    }
    return this._stdDev;
  }

  get q1(): number {
    if (this._q1 === undefined) {
      this._q1 = this.percentile(25);
    }
    return this._q1;
  }

  get q2(): number {
    if (this._q2 === undefined) {
      this._q2 = this.percentile(50);
    }
    return this._q2;
  }

  get q3(): number {
    if (this._q3 === undefined) {
      this._q3 = this.percentile(75);
    }
    return this._q3;
  }

  get zScores(): number[] {
    if (this._zScores === undefined) {
      const mean = this.mean;
      const sd = this.stdDev;
      this._zScores = this.data.map(x => (x - mean) / sd);
    }
    return this._zScores;
  }

  get normalized(): number[] {
    if (this._normalized === undefined) {
      const min = this.orderedData[0];
      const max = this.orderedData[this.orderedData.length - 1];
      this._normalized = this.data.map((x) => (x - min) / (max - min));
    }
    return this._normalized;
  }

  private percentile(p: number): number {
    const idx = (p / 100) * (this.orderedData.length - 1);
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    return lo === hi
      ? this.orderedData[lo]
      : this.orderedData[lo] + (this.orderedData[hi] - this.orderedData[lo]) * (idx - lo);
  }
}
