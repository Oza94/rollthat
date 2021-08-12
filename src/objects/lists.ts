import { randomInt } from "../primitives/numbers";
import {
  List,
  RandomFunc,
  WeightedList,
  WeightedListTuple,
  WeightFunc,
} from "../types";

export function isWeightedList<T>(value: List<T>): value is WeightedList<T> {
  if (Array.isArray(value)) {
    return false;
  } else if (typeof value.total === "number" && Array.isArray(value.items)) {
    return true;
  }
  return false;
}

export function randomItem<T>(list: List<T>, r: RandomFunc = Math.random): T {
  if (isWeightedList(list)) {
    return randomItemWeighted(list, r);
  }
  return list[randomInt(0, list.length, r)];
}

export function randomItemIndexWeighted<T>(
  list: WeightedList<T>,
  r: RandomFunc = Math.random
): number {
  let rand = randomInt(0, list.total + 1, r);
  let i = 0;

  while (rand >= list.items[i].weight) {
    rand -= list.items[i].weight;
    i += 1;
  }

  return i;
}

export function randomItemWeighted<T>(
  list: WeightedList<T>,
  r: RandomFunc = Math.random
): T {
  return list.items[randomItemIndexWeighted(list, r)].value;
}

export function randomItems<T>(
  list: List<T>,
  count: number,
  { uniq = false }: { uniq: boolean } = { uniq: false },
  r: RandomFunc = Math.random
) {
  if (isWeightedList(list)) {
    return randomItemsWeighted(list, count, { uniq }, r);
  }

  if (uniq && count > list.length) {
    throw new Error(
      `Can't get ${count} random item(s) from a list with length=${list.length}`
    );
  }

  const result: T[] = [];

  while (result.length < count) {
    let i = randomInt(0, result.length, r);
    while (uniq && result.includes(list[i])) {
      i = (i + 1) % list.length;
    }
    result.push(list[i]);
  }

  return result;
}

export function randomItemsWeighted<T>(
  list: WeightedList<T>,
  count: number,
  { uniq = false }: { uniq: boolean } = { uniq: false },
  r: RandomFunc = Math.random
): T[] {
  if (uniq && count > list.items.length) {
    throw new Error(
      `Can't get ${count} random item(s) from a list with length=${list.items.length}`
    );
  }

  const result: T[] = [];

  while (result.length < count) {
    let i = randomItemIndexWeighted(list, r);
    while (uniq && result.includes(list.items[i].value)) {
      i = (i + 1) % list.items.length;
    }
    result.push(list.items[i].value);
  }

  return result;
}

export function createWeightedList<T>(
  list: WeightedListTuple<T>[]
): WeightedList<T>;

export function createWeightedList<T>(
  list: T[],
  weightFunc: WeightFunc<T>
): WeightedList<T>;

export function createWeightedList<T>(
  list: WeightedListTuple<T>[] | T[],
  weightFunc?: WeightFunc<T>
): WeightedList<T> {
  let total = 0;
  const items: WeightedListTuple<T>[] = [];

  for (let i = 0; i < list.length; i++) {
    let value: T;
    let weight: number = 0;

    if (weightFunc) {
      value = list[i] as T;
      weight = weightFunc(value);
    } else {
      ({ value, weight } = list[i] as WeightedListTuple<T>);
    }

    items.push({ value, weight });
    total += weight;
  }

  return { total, items };
}
