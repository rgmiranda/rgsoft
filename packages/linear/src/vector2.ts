export class Vector2 {
    private _x : number;
    private _y : number;
    private _mag? : number;
    private _angle? : number;

    /**
     * 
     * @param { number } x 
     * @param { number } y 
     */
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
        this.resetValues();
    }

    private resetValues() {
        this._mag = undefined;
        this._angle = undefined;
    }

    /**
     * @returns { number }
     */
    get mag(): number {
        if (this._mag === undefined) {
            this._mag = Math.sqrt(this._x * this._x + this._y * this._y);
        }
        return this._mag;
    }

    /**
     * @param { number } value
     */
    set mag(value: number) {
        if (value < 0) {
            throw new Error('New magnitude must be positive');
        }
        this.normalize();
        this.mult(value);
        this._mag = value;
    }

    /**
     * @returns { number }
     */
    get angle(): number {
        if (this._angle === undefined) {
            if (this.mag > 0) {
                this._angle = Math.atan2(this._y, this._x);
            } else {
                this._angle = 0;
            }
        }
        return this._angle;
    }

    /**
     * @returns { number }
     */
    get x(): number {
        return this._x;
    }

    /**
     * @param { number } value
     */
    set x(value: number) {
        this._x = value;
        this.resetValues();
    }

    /**
     * @returns { number }
     */
    get y(): number {
        return this._y;
    }

    /**
     * @param { number } value
     */
    set y(value: number) {
        this._y = value;
        this.resetValues();
    }

    /**
     * 
     * @returns { Vector2 }
     */
    normalize(): Vector2 {
        if (this.mag === 0) {
            return this;
        }
        this._x /= this.mag;
        this._y /= this.mag;
        this.resetValues();
        return this;
    }

    /**
     * 
     * @param { number} num 
     * @returns { Vector2 }
     */
    mult(num: number): Vector2 {
        this._x *= num;
        this._y *= num;
        this.resetValues();
        return this;
    }

    /**
     * 
     * @param { number} num 
     * @returns { Vector2 }
     */
    div(num: number): Vector2 {
        this._x /= num;
        this._y /= num;
        this.resetValues();
        return this;
    }

    /**
     * @param {Vector2} v
     * @returns {number}
     */
    dot(v: Vector2): number {
        return this._x * v._x + this._y * v._y;
    }

    /**
     * 
     * @param { Vector2 } vector 
     * @returns { Vector2 }
     */
    add(vector: Vector2): Vector2 {
        this._x += vector._x;
        this._y += vector._y;
        this.resetValues();
        return this;
    }

    /**
     * 
     * @param { Vector2 } vector 
     * @returns { Vector2 }
     */
    sub(vector: Vector2): Vector2 {
        this._x -= vector._x;
        this._y -= vector._y;
        this.resetValues();
        return this;
    }

    /**
     * 
     * @param { Vector2 } vector 
     * @returns { number }
     */
    dist(vector: Vector2): number {
        const dx = this._x - vector._x;
        const dy = this._y - vector._y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * 
     * @param { Vector2 } vector 
     * @returns { boolean }
     */
    equals(vector: Vector2): boolean {
        return vector.x === this._x && vector.y === this.y;
    }

    /**
     * 
     * @param { Vector2 } vector 
     * @returns { number }
     */
    angleTo(vector: Vector2): number {
        const cp = this.dot(vector);
        if (this.mag === 0 || vector.mag === 0) {
            return NaN;
        }
        return Math.acos(cp / (this.mag * vector.mag));
    }

    /**
     * Calculates the projection on another vector
     * @param { Vector2 } vector 
     * @returns { Vector2 }
     */
    projection(vector: Vector2): Vector2 {
        const cp = this.dot(vector);
        const sqrtMag = vector.dot(vector);
        const proj = vector.copy();
        proj.mult(cp / sqrtMag);
        return proj;
    }

    /**
     * @returns { Vector2 }
     */
    copy(): Vector2 {
        return new Vector2(this._x, this._y);
    }

    transpose() {
        const aux = this._y;
        this._y = this._x;
        this._x = aux;
        this.resetValues();
    }

    /**
     * 
     * @param { number } mag
     */
    limit(mag: number) {
        if (this.mag <= mag) {
            return;
        }
        this.mag = mag;
    }

    /**
     * 
     * @param { number } angle 
     * @returns { Vector2 }
     */
    static fromAngle(angle: number): Vector2 {
        const instance = new Vector2(Math.cos(angle), Math.sin(angle));
        instance._angle = angle;
        return instance;
    }

    /**
     * 
     * @param { Vector2 } v 
     * @param { Vector2 } w 
     * @returns { Vector2 }
     */
    static add(v: Vector2, w: Vector2): Vector2 {
        const instance = v.copy();
        return instance.add(w);
    }

    /**
     * 
     * @param { Vector2 } v 
     * @param { Vector2 } w 
     * @returns { Vector2 }
     */
    static sub(v: Vector2, w: Vector2): Vector2 {
        const instance = v.copy();
        return instance.sub(w);
    }

    /**
     * 
     * @param { Vector2 } v 
     * @param { number } n
     * @returns { Vector2 }
     */
    static mult(v: Vector2, n: number): Vector2 {
        const instance = v.copy();
        return instance.mult(n);
    }

    /**
     * 
     * @param { Vector2 } v 
     * @param { number } n
     * @returns { Vector2 }
     */
    static div(v: Vector2, n: number): Vector2 {
        const instance = v.copy();
        return instance.div(n);
    }
}
