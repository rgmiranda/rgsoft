export class Complex {
  private _mag?: number;
  private _arg?: number;

  constructor(public readonly real: number, public readonly imaginary: number) { }

  static fromPolar(r: number, theta: number): Complex {
    return new Complex(r * Math.cos(theta), r * Math.sin(theta));
  }

  static zero = new Complex(0, 0);
  static one = new Complex(1, 0);
  static i = new Complex(0, 1);

  /**
   *
   * @param { number | Complex} n
   */
  add(n: number | Complex): Complex {
    let { real, imaginary } = this;
    if (typeof n === "number") {
      real += n;
    } else if (n instanceof Complex) {
      real += n.real;
      imaginary += n.imaginary;
    }
    return new Complex(real, imaginary);
  }

  /**
   *
   * @param { number | Complex} n
   */
  sub(n: number | Complex): Complex {
    let { real, imaginary } = this;
    if (typeof n === "number") {
      real -= n;
    } else if (n instanceof Complex) {
      real -= n.real;
      imaginary -= n.imaginary;
    }
    return new Complex(real, imaginary);
  }

  /**
   *
   * @param { number | Complex} n
   */
  mult(n: number | Complex): Complex {
    let { real, imaginary } = this;
    if (typeof n === "number") {
      real *= n;
      imaginary *= n;
    } else if (n instanceof Complex) {
      real = this.real * n.real - this.imaginary * n.imaginary;
      imaginary = this.real * n.imaginary + this.imaginary * n.real;
    }
    return new Complex(real, imaginary);
  }

  /**
   *
   * @param { number | Complex} n
   */
  div(n: number | Complex): Complex {
    let { real, imaginary } = this;

    if (n === 0 || (n instanceof Complex && n.real === 0 && n.imaginary === 0)) {
      throw new Error("Division by zero");
    }

    if (typeof n === "number") {
      real /= n;
      imaginary /= n;
    } else if (n instanceof Complex) {
      const d = n.real * n.real + n.imaginary * n.imaginary;
      real = (this.real * n.real + this.imaginary * n.imaginary) / d;
      imaginary = (this.imaginary * n.real - this.real * n.imaginary) / d;
    }
    return new Complex(real, imaginary);
  }

  pow(n: number): Complex {
    const r = Math.pow(this.mag, n);
    const theta = this.arg * n;
    return new Complex(r * Math.cos(theta), r * Math.sin(theta));
  }

  sqrt(): Complex {
    let { real, imaginary } = this;
    const m = Math.sqrt(this.mag);
    const phi = Math.atan2(this.imaginary, this.real) * 0.5;
    real = m * Math.cos(phi);
    imaginary = m * Math.sin(phi);

    return new Complex(real, imaginary);
  }

  conjugate(): Complex {
    return new Complex(this.real, -1 * this.imaginary);
  }

  equals(n: Complex): boolean {
    return this.real === n.real && this.imaginary === n.imaginary;
  }

  toString(): string {
    let str = "";
    if (this.real !== 0) {
      str += `${this.real}`;
    }
    if (this.imaginary > 0) {
      if (this.imaginary === 1) {
        str += ` + i`;
      } else {
        str += ` + ${this.imaginary}i`;
      }
    } else if (this.imaginary < 0) {
      if (this.imaginary === -1) {
        str += ` - i`;
      } else {
        str += ` - ${Math.abs(this.imaginary)}i`;
      }
    }
    return str.trim();
  }

  /**
   * @returns { number }
   */
  get mag(): number {
    if (this._mag === undefined) {
      this._mag = Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
    }
    return this._mag;
  }

  /**
   * @returns { number }
   */
  get arg(): number {
    if (!this._arg) {
      this._arg = Math.atan2(this.imaginary, this.real);
    }
    return this._arg;
  }
};
