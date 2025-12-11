import { approximateTo, EPSILON } from "@rgsoft/math";
import { Vector } from "./vector";

export type ExtendPosition = 'right' | 'below';
export type SliceDirection = 'vertical' | 'horizontal';

const normalizeZero: (n: number) => number = (n) => {
  return Math.abs(n) < EPSILON ? 0 : n;
}

export class Matrix {
  private readonly _data: readonly (readonly number[])[];
  private _det?: number;

  constructor(
    private readonly _rows: number,
    private readonly _cols: number,
    values?: number[][]
  ) {
    if (
      !Number.isInteger(_rows) ||
      _rows <= 0 ||
      !Number.isInteger(_cols) ||
      _cols <= 0
    ) {
      throw new Error("Matrix dimensions must be positive integers");
    }

    if (values) {
      if (values.length !== _rows || values.some((r) => r.length !== _cols)) {
        throw new Error("Initial values do not match matrix dimensions");
      }
      this._data = values.map((row) => Object.freeze([...row]));
      Object.freeze(this._data);
    } else {
      this._data = Array(_rows)
        .fill(0)
        .map(() => Array(_cols).fill(0));
    }
  }

  private validateIndexes(i: number, j: number): void {
    this.validateRowIndex(i);
    this.validateColumnIndex(j);
  }

  private validateRowIndex(i: number): void {
    if (!Number.isInteger(i)) {
      throw new Error("Index must be a positive integer");
    }
    if (i < 0 || i >= this._rows) {
      throw new Error(`Row index ${i} out of bounds`);
    }
  }

  private validateColumnIndex(j: number): void {
    if (!Number.isInteger(j)) {
      throw new Error("Index must be a positive integer");
    }
    if (j < 0 || j >= this._cols) {
      throw new Error(`Column index ${j} out of bounds`);
    }
  }

  at(i: number, j: number): number {
    this.validateIndexes(i, j);
    return this._data[i][j];
  }

  rowAt(i: number): number[] {
    this.validateRowIndex(i);
    return [...this._data[i]];
  }

  columnAt(j: number): number[] {
    this.validateColumnIndex(j);
    return this._data.map((r) => r[j]);
  }

  set(value: number, i: number, j: number): Matrix {
    this.validateIndexes(i, j);
    const data = this.data;
    data[i][j] = normalizeZero(value);
    return new Matrix(this._rows, this._cols, data);
  }

  setRow(rowData: number[], i: number): Matrix {
    this.validateRowIndex(i);
    this.validateColumnIndex(rowData.length - 1);
    const data = this.data;
    data[i] = rowData.map(normalizeZero);
    return new Matrix(this._rows, this._cols, data);
  }

  setColumn(columnData: number[], j: number): Matrix {
    this.validateRowIndex(columnData.length - 1);
    this.validateColumnIndex(j);
    const data = this.data;
    for (let i = 0; i < this._rows; i++) {
      data[i][j] = normalizeZero(columnData[i]);
    }
    return new Matrix(this._rows, this._cols, data);
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
    const data = Array(size)
      .fill(0)
      .map(() => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
      data[i][i] = 1;
    }
    return new Matrix(size, size, data);
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
    const data = this.data;
    data[i] = data[i].map((v) => normalizeZero(v * scalar));
    return new Matrix(this._rows, this._cols, data);
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
    const data = this.data;
    const scaledRow = data[sourceRow].map((v) => normalizeZero(v * scalar));
    data[targetRow] = data[targetRow].map((v, j) =>
      normalizeZero(v + scaledRow[j])
    );
    return new Matrix(this._rows, this._cols, data);
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
    const data = this.data;
    if (i0 === i1) {
      return new Matrix(this._rows, this._cols, data);
    }
    const aux = data[i0];
    data[i0] = data[i1];
    data[i1] = aux;
    return new Matrix(this._rows, this._cols, data);
  }

  get data(): number[][] {
    return this._data.map((row) => [...row]);
  }

  get det(): number {
    if (this._cols !== this._rows) {
      throw new Error('Cannot get determinant on non-square matrix');
    }
    if (this._det !== undefined) {
      return this._det;
    }
    let det = 1;
    let reduced: Matrix = this;
    let sign = 1;
    for (let col = 0; col < this._cols; col++) {
      if (reduced.at(col, col) === 0) {
        for (let row = col + 1; row < reduced._rows; row++) {
          if (reduced.at(row, col) !== 0) {
            reduced = reduced.swapRows(row, col);
            sign = -sign;
            break;
          }
        }
      }
      const pivot = reduced.at(col, col);
      det *= pivot;

      if (pivot === 0) {
        continue;
      }

      for (let row = col + 1; row < reduced._rows; row++) {
        const factor = -reduced.at(row, col) / pivot;
        if (factor !== 0) {
          reduced = reduced.addScaledRow(col, row, factor);
        }
      }
    }
    this._det = approximateTo(sign * det, 0);

    return this._det;
  }

  reduce(): Matrix {
    let reduced: Matrix = this;
    const minSize = Math.min(this._rows, this._cols);
    let row = 0;
    for (let col = 0; col < minSize; col++) {
      if (reduced.at(row, col) === 0) {
        for (let k = col + 1; k < reduced._rows; k++) {
          if (reduced.at(k, col) !== 0) {
            reduced = reduced.swapRows(k, row);
          }
        }
      }

      const pivot = reduced.at(row, col);

      if (pivot === 0) {
        continue;
      }

      reduced = reduced.scaleRow(row, 1 / pivot);

      for (let k = row + 1; k < this._rows; k++) {
        const factor = -reduced.at(k, col);
        if (factor !== 0) {
          reduced = reduced.addScaledRow(row, k, factor);
        }
      }

      for (let k = row - 1; k >= 0; k--) {
        const factor = -reduced.at(k, col);
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
      const data = this._data.map((row) =>
        [...row].concat(Array(matrix._cols).fill(0))
      );
      for (let i = 0; i < this._rows; i++) {
        for (let j = 0; j < matrix._cols; j++) {
          data[i][this._cols + j] = matrix.at(i, j);
        }
      }
      return new Matrix(this._rows, this._cols + matrix._cols, data);
    } else if (direction === "below") {
      if (this._cols !== matrix._cols) {
        throw new Error("Cannot extend below: column counts must match");
      }
      const data = this.data.concat(matrix.data);
      return new Matrix(this._rows + matrix._rows, this._cols, data);
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
    const data = this._data.map((row) => row.slice(start, start + length));
    return new Matrix(this._rows, length, data);
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

    const data = this.data.slice(start, start + length);
    return new Matrix(length, this._cols, data);
  }

  hasZeroRows(): boolean {
    for (let i = 0; i < this._rows; i++) {
      let isZeroRow = true;
      for (let j = 0; j < this._cols; j++) {
        if (this.at(i, j) !== 0) {
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
      throw new Error("Cannot multiply: columns and rows do not match");
    }
    const data: number[][] = Array(this._rows)
      .fill(0)
      .map(() => Array(m._cols).fill(0));
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < m._cols; j++) {
        const row = this.rowAt(i);
        const col = m.columnAt(j);
        const val = row.reduce((prev, curr, k) => prev + curr * col[k], 0);
        data[i][j] = normalizeZero(val);
      }
    }
    return new Matrix(this._rows, m._cols, data);
  }

  multiplyVector(v: Vector): Vector {
    if (v.dim !== this._cols) {
      throw new Error(
        `Cannot multiply: Matrix is ${this._rows}x${this._cols} but vector has dimension ${v.dim}`
      );
    }

    const result = new Array(this._rows).fill(0);

    for (let i = 0; i < this._rows; i++) {
      const row = this.rowAt(i);
      let sum = 0;
      for (let j = 0; j < this._cols; j++) {
        sum += row[j] * v.at(j);
      }
      result[i] = sum;
    }

    return new Vector(result);
  }

  traspose(): Matrix {
    const data = Array(this._cols)
      .fill(0)
      .map((_, j) => this.columnAt(j));
    return new Matrix(this._cols, this._rows, data);
  }

  *[Symbol.iterator](): Generator<number> {
    for (const row of this._data) {
      for (const value of row) {
        yield value;
      }
    }
  }

  *rows(): Generator<number[]> {
    for (const row of this._data) {
      yield [...row];
    }
  }

  *columns(): Generator<number[]> {
    for (let col = 0; col < this._cols; col++) {
      const column: number[] = [];
      for (let row = 0; row < this._rows; row++) {
        column.push(this._data[row][col]);
      }
      yield column;
    }
  }

  *entries(): Generator<{ row: number; col: number; value: number }> {
    for (let i = 0; i < this._rows; i++) {
      for (let j = 0; j < this._cols; j++) {
        yield { row: i, col: j, value: this._data[i][j] };
      }
    }
  }
}
