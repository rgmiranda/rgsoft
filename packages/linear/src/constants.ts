import { Vector2 } from "./vector2";
import { Vector3 } from "./vector3";

export const V2_ZERO = Object.freeze(new Vector2(0, 0));
export const V2_UNIT_X = Object.freeze(new Vector2(1, 0));
export const V2_UNIT_Y = Object.freeze(new Vector2(0, 1));

export const V3_ZERO = Object.freeze(new Vector3(0, 0, 0));
export const V3_UNIT_X = Object.freeze(new Vector3(1, 0, 0));
export const V3_UNIT_Y = Object.freeze(new Vector3(0, 1, 0));
export const V3_UNIT_Z = Object.freeze(new Vector3(0, 0, 1));