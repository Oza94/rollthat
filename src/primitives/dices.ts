import { MultiRollResult, RandomFunc } from "../types";
import { randomInt } from "./numbers";

export function rollDice(faces: number, r: RandomFunc = Math.random) {
  return randomInt(0, faces, r) + 1;
}

export function rollDices(
  count: number,
  faces: number,
  r: RandomFunc = Math.random
): MultiRollResult {
  let result = 0;
  const rolls: number[] = [];

  for (let i = 0; i < count; i++) {
    const roll = rollDice(faces, r);

    rolls.push(roll);
    result += roll;
  }

  return { result, rolls };
}
