import { RandomFunc } from "../types";

export function randomFloat(
  min: number,
  max: number,
  r: RandomFunc = Math.random
) {
  return (max - min) * r() + min;
}

export function randomInt(
  min: number,
  max: number,
  r: RandomFunc = Math.random
) {
  return Math.floor(randomFloat(min, max, r));
}
