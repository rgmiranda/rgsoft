export type ExtendPosition = 'right' | 'below';
export type SliceDirection = 'vertical' | 'horizontal';

export class Matrix {
  private readonly vectors: number[][];
  private static readonly EPSILON = 1e-10;

  constructor(
    private readonly _rows: number,
    private readonly _cols: number,
    initialValues?: number[][]
  ) {
    if (
      !Number.isInteger(_rows) ||
      _rows <= 0 ||
      !Number.isInteger(_cols) ||
      _cols <= 0
    ) {
      throw new Error("Matrix dimensions must be positive integers");
    }

    if (initialValues) {
      if (
        initialValues.length !== _rows ||
        initialValues.some((r) => r.length !== _cols)
      ) {
        throw new Error("Initial values do not match matrix dimensions");
      }
      this.vectors = initialValues.map((row) => [...row]);
    } else {
      this.vectors = Array(_rows)
        .fill(0)
        .map(() => Array(_cols).fill(0));
    }
  }

  private validateIndexes(i: number, j: number): void {
    this.validateRowIndex(i);
    this.validateColumnIndex(j);
  }

  private validateRowIndex(i: number): void {
    if (i < 0 || i >= this._rows) {
      throw new Error(`Row index ${i} out of bounds`);
    }
  }

  private validateColumnIndex(j: number): void {
    if (j < 0 || j >= this._cols) {
      throw new Error(`Column index ${j} out of bounds`);
    }
  }

  get(i: number, j: number): number {
    this.validateIndexes(i, j);
    return this.vectors[i][j];
  }

  getRow(i: number): number[] {
    this.validateRowIndex(i);
    return this.vectors[i];
  }

  getColumn(j: number): number[] {
    this.validateColumnIndex(j);
    return this.vectors.map((r) => r[j]);
  }

  set(value: number, i: number, j: number): void {
    this.validateIndexes(i, j);
    this.vectors[i][j] = Matrix.normalizeZero(value);
  }

  clone(): Matrix {
    return new Matrix(this._rows, this._cols, this.vectors);
  }

  private static normalizeZero(n: number): number {
    return Math.abs(n) < Matrix.EPSILON ? 0 : n;
  }

  /**
   * Creates an identity matrix of the given size.
   * The identity matrix is a square matrix with 1s on the diagonal and 0s elsewhere.
   *
   * @param size - The number of rows and columns of the square matrix. Must be a positive integer.
   * @returns A new identity matrix of dimensions `size x size`.
   *
   * @example
   * const I = Matrix.identity(3);
   * // [[1,0,0],
   * //  [0,1,0],
   * //  [0,0,1]]
   */
  static identity(size: number): Matrix {
    const m = new Matrix(size, size);
    for (let i = 0; i < size; i++) {
      m.set(1, i, i);
    }
    return m;
  }

  /**
   * Returns a new matrix where a specific row has been multiplied by a scalar value.
   *
   * @param i - The index of the row to multiply (0-based).
   * @param n - The scalar multiplier.
   * @returns A new matrix with the specified row scaled.
   *
   * @throws If the row index is out of bounds or the multiplier is not finite.
   *
   * @example
   * const scaled = m.scaleRow(1, 5); // multiplies row 1 by 5
   */
  scaleRow(i: number, scalar: number): Matrix {
    this.validateRowIndex(i);
    if (!Number.isFinite(scalar)) {
      throw new Error("Multiplier must be a finite number");
    }
    if (isNaN(scalar)) {
      throw new Error("Multiplier must not be NaN");
    }
    const m = this.clone();
    for (let j = 0; j < this._cols; j++) {
      const updated = m.get(i, j) * scalar;
      m.set(updated, i, j);
    }
    return m;
  }

  /**
   * Returns a new matrix where a multiple of one row is added to another row.
   *
   * @param sourceRow - The index of the row to multiply (0-based).
   * @param targetRow - The index of the row to which the result will be added (0-based).
   * @param scalar - The multiplier applied to the source row. Defaults to 1.
   * @returns A new matrix with the scaled row added to the target row.
   *
   * @throws If any row indices are out of bounds or the scalar is not finite.
   *
   * @example
   * const result = m.addScaledRow(0, 2, 3);
   * // Adds 3 times row 0 to row 2
   */
  addScaledRow(
    sourceRow: number,
    targetRow: number,
    scalar: number = 1
  ): Matrix {
    this.validateRowIndex(sourceRow);
    this.validateRowIndex(targetRow);
    if (!Number.isFinite(scalar)) {
      throw new Error("Multiplier must be a finite number");
    }
    if (isNaN(scalar)) {
      throw new Error("Multiplier must not be NaN");
    }
    const m = this.clone();
    for (let j = 0; j < this._cols; j++) {
      const updated = m.get(targetRow, j) + m.get(sourceRow, j) * scalar;
      m.set(updated, targetRow, j);
    }
    return m;
  }

  /**
   * Returns a new matrix where two specified rows have been swapped.
   *
   * @param i - The index of the first row to swap (0-based).
   * @param j - The index of the second row to swap (0-based).
   * @returns A new matrix with the specified rows swapped.
   *
   * @throws If any of the row indices are out of bounds.
   *
   * @example
   * const m2 = m.swapRows(0, 2);
   */
  swapRows(i0: number, i1: number): Matrix {
    this.validateRowIndex(i0);
    this.validateRowIndex(i1);
    const m = this.clone();
    if (i0 === i1) {
      return m;
    }
    for (let col = 0; col < this._cols; col++) {
      const temp = m.get(i0, col);
      m.set(m.get(i1, col), i0, col);
      m.set(temp, i1, col);
    }
    return m;
  }

  get data(): number[][] {
    return this.vectors.map((row) => [...row]);
  }

  reduce(): Matrix {
    let reduced = this.clone();
    const minSize = Math.min(this._rows, this._cols);
    let row = 0;
    for (let col = 0; col < minSize; col++) {
      if (reduced.get(row, col) === 0) {
        for (let k = col + 1; k < reduced._rows; k++) {
          if (reduced.get(k, col) !== 0) {
            reduced = reduced.swapRows(k, row);
          }
        }
      }

      const pivot = reduced.get(row, col);

      if (pivot === 0) {
        continue;
      }

      reduced = reduced.scaleRow(row, 1 / pivot);

      for (let k = row + 1; k < this._rows; k++) {
        const factor = -reduced.get(k, col);
        if (factor !== 0) {
          reduced = reduced.addScaledRow(row, k, factor);
        }
      }

      for (let k = row - 1; k >= 0; k--) {
        const factor = -reduced.get(k, col);
        if (factor !== 0) {
          reduced = reduced.addScaledRow(row, k, factor);
        }
      }

      row++;
      if (row >= reduced._rows) {
        break;
      }
    }

    return reduced;
  }

  extend(matrix: Matrix, direction: ExtendPosition): Matrix {
    if (direction === "right") {
      if (this._rows !== matrix._rows) {
        throw new Error("Cannot extend to the right: row counts must match");
      }
      const result = new Matrix(this._rows, this._cols + matrix._cols);
      for (let i = 0; i < this._rows; i++) {
        for (let j = 0; j < this._cols; j++) {
          result.set(this.get(i, j), i, j);
        }
        for (let j = 0; j < matrix._cols; j++) {
          result.set(matrix.get(i, j), i, j + this._cols);
        }
      }
      return result;
    } else if (direction === "below") {
      if (this._cols !== matrix._cols) {
        throw new Error("Cannot extend below: column counts must match");
      }
      const result = new Matrix(this._rows + matrix._rows, this._cols);
      for (let i = 0; i < this._rows; i++) {
        for (let j = 0; j < this._cols; j++) {
          result.set(this.get(i, j), i, j);
        }
      }
      for (let i = 0; i < matrix._rows; i++) {
        for (let j = 0; j < this._cols; j++) {
          result.set(matrix.get(i, j), i + this._rows, j);
        }
      }
      return result;
    } else {
      throw new Error(`Invalid direction: ${direction}`);
    }
  }

  extendRight(matrix: Matrix): Matrix {
    return this.extend(matrix, "right");
  }

  extendBelow(matrix: Matrix): Matrix {
    return this.extend(matrix, "below");
  }

  sliceColumns(start: number, length?: number): Matrix {
    if (length === undefined) {
      length = this._cols - start;
    }
    if (length <= 0) {
      throw new Error("Length must be a positive integer");
    }
    this.validateColumnIndex(start);
    this.validateColumnIndex(start + length - 1);
    const m = new Matrix(this._rows, length);
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < length; j++) {
        m.set(this.get(i, start + j), i, j);
      }
    }
    return m;
  }

  sliceRows(start: number, length?: number): Matrix {
    this.validateRowIndex(start);

    if (length === undefined) {
      length = this._rows - start;
    }

    if (length <= 0) {
      throw new Error("Length must be a positive integer");
    }

    this.validateRowIndex(start + length - 1);

    const m = new Matrix(length, this._cols);
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < this._cols; j++) {
        m.set(this.get(start + i, j), i, j);
      }
    }
    return m;
  }

  hasZeroRows(): boolean {
    for (let i = 0; i < this._rows; i++) {
      let isZeroRow = true;
      for (let j = 0; j < this._cols; j++) {
        if (this.get(i, j) !== 0) {
          isZeroRow = false;
          break;
        }
      }
      if (isZeroRow) {
        return true;
      }
    }
    return false;
  }

  invert(): Matrix {
    if (this._rows !== this._cols) {
      throw new Error("Cannot invert a non-square matrix");
    }
    const m = this.extendRight(Matrix.identity(this._rows)).reduce();
    const left = m.sliceColumns(0, this._rows);
    const right = m.sliceColumns(this._rows);
    if (left.hasZeroRows()) {
      throw new Error("Non-invertible matrix");
    }
    return right;
  }

  multiply(m: Matrix): Matrix {
    if (this._cols !== m._rows) {
      throw new Error('Cannot multiply: columns and rows do not match');
    }
    const n = new Matrix(this._rows, m._cols);
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < m._cols; j++) {
        const row = this.getRow(i);
        const col = m.getColumn(j);
        const val = row.reduce((prev, curr, k) => prev + curr * col[k], 0);
        n.set(val, i, j);
      }
    }
    return n;
  }

  traspose(): Matrix {
    const m = new Matrix(this._cols, this._rows);
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._cols; j++) {
        m.set(this.get(i, j), j, i);
      }
    }
    return m;
  }

  *[Symbol.iterator](): Generator<number> {
    for (const row of this.vectors) {
      for (const value of row) {
        yield value;
      }
    }
  }

  *rows(): Generator<number[]> {
    for (const row of this.vectors) {
      yield [...row];
    }
  }

  *columns(): Generator<number[]> {
    for (let col = 0; col < this._cols; col++) {
      const column: number[] = [];
      for (let row = 0; row < this._rows; row++) {
        column.push(this.vectors[row][col]);
      }
      yield column;
    }
  }

  *entries(): Generator<{ row: number; col: number; value: number }> {
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._cols; j++) {
        yield { row: i, col: j, value: this.vectors[i][j] };
      }
    }
  }
}
