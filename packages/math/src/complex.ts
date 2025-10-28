export class Complex {
  private _mag?: number;
  private _arg?: number;

  constructor(public readonly a: number, public readonly b: number) { }

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
    let { a, b } = this;
    if (typeof n === "number") {
      a += n;
    } else if (n instanceof Complex) {
      a += n.a;
      b += n.b;
    }
    return new Complex(a, b);
  }

  /**
   *
   * @param { number | Complex} n
   */
  sub(n: number | Complex): Complex {
    let { a, b } = this;
    if (typeof n === "number") {
      a -= n;
    } else if (n instanceof Complex) {
      a -= n.a;
      b -= n.b;
    }
    return new Complex(a, b);
  }

  /**
   *
   * @param { number | Complex} n
   */
  mult(n: number | Complex): Complex {
    let { a, b } = this;
    if (typeof n === "number") {
      a *= n;
      b *= n;
    } else if (n instanceof Complex) {
      a = this.a * n.a - this.b * n.b;
      b = this.a * n.b + this.b * n.a;
    }
    return new Complex(a, b);
  }

  /**
   *
   * @param { number | Complex} n
   */
  div(n: number | Complex): Complex {
    let { a, b } = this;

    if (n === 0 || (n instanceof Complex && n.a === 0 && n.b === 0)) {
      throw new Error("Division by zero");
    }

    if (typeof n === "number") {
      a /= n;
      b /= n;
    } else if (n instanceof Complex) {
      const d = n.a * n.a + n.b * n.b;
      a = (this.a * n.a + this.b * n.b) / d;
      b = (this.b * n.a - this.a * n.b) / d;
    }
    return new Complex(a, b);
  }

  pow(n: number): Complex {
    const r = Math.pow(this.mag, n);
    const theta = this.arg * n;
    return new Complex(r * Math.cos(theta), r * Math.sin(theta));
  }

  sqrt(): Complex {
    let { a, b } = this;
    const m = Math.sqrt(this.mag);
    const phi = Math.atan2(this.b, this.a) * 0.5;
    a = m * Math.cos(phi);
    b = m * Math.sin(phi);

    return new Complex(a, b);
  }

  conjugate(): Complex {
    return new Complex(this.a, -1 * this.b);
  }

  equals(n: Complex): boolean {
    return this.a === n.a && this.b === n.b;
  }

  toString(): string {
    let str = "";
    if (this.a !== 0) {
      str += `${this.a}`;
    }
    if (this.b > 0) {
      if (this.b === 1) {
        str += ` + i`;
      } else {
        str += ` + ${this.b}i`;
      }
    } else if (this.b < 0) {
      if (this.b === -1) {
        str += ` - i`;
      } else {
        str += ` - ${Math.abs(this.b)}i`;
      }
    }
    return str.trim();
  }

  /**
   * @returns { number }
   */
  get mag(): number {
    if (this._mag === undefined) {
      this._mag = Math.sqrt(this.a * this.a + this.b * this.b);
    }
    return this._mag;
  }

  /**
   * @returns { number }
   */
  get arg(): number {
    if (!this._arg) {
      this._arg = Math.atan2(this.b, this.a);
    }
    return this._arg;
  }
};