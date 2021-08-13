import { randomInt } from "../primitives/numbers";
import {
  List,
  RandomFunc,
  WeightedList,
  WeightedListTuple,
  WeightFunc,
} from "../types";

export type RandomItemOptions<T> = { exclude?: T[]; rand?: RandomFunc };

export type RandomItemsOptions<T> = {
  exclude?: T[];
  uniq?: boolean;
  rand?: RandomFunc;
};

const DEFAULT_RAND_ITEM_OPTS = { rand: Math.random };

export function isWeightedList<T>(value: List<T>): value is WeightedList<T> {
  if (Array.isArray(value)) {
    return false;
  } else if (typeof value.total === "number" && Array.isArray(value.items)) {
    return true;
  }
  return false;
}

export function randomItem<T>(
  list: List<T>,
  { exclude, rand }: RandomItemOptions<T> = DEFAULT_RAND_ITEM_OPTS
): T {
  if (isWeightedList(list)) {
    return randomItemWeighted(list, { exclude, rand });
  }
  let index = randomInt(0, list.length, rand);
  let excludeCount = 0;
  while (exclude && exclude.includes(list[index])) {
    index = (index + 1) % list.length;
    excludeCount += 1;
    if (excludeCount >= list.length) {
      throw new Error(
        `Cannot get random item because all list values are excluded.`
      );
    }
  }
  return list[index];
}

export function randomItemIndexWeighted<T>(
  list: WeightedList<T>,
  rand: RandomFunc = Math.random
): number {
  let randInt = randomInt(0, list.total + 1, rand);
  let i = 0;
  while (randInt >= list.items[i].weight) {
    randInt -= list.items[i].weight;
    i += 1;
  }

  return i;
}

export function randomItemWeighted<T>(
  list: WeightedList<T>,
  { exclude, rand }: RandomItemOptions<T> = DEFAULT_RAND_ITEM_OPTS
): T {
  let index = randomItemIndexWeighted(list, rand);
  let excludeCount = 0;
  while (exclude && exclude.includes(list.items[index].value)) {
    index = (index + 1) % list.items.length;
    excludeCount += 1;
    if (excludeCount >= list.items.length) {
      throw new Error(
        `Cannot get random item because all list values are excluded.`
      );
    }
  }
  return list.items[index].value;
}

export function randomItems<T>(
  list: List<T>,
  count: number,
  { rand, uniq, exclude }: RandomItemsOptions<T> = DEFAULT_RAND_ITEM_OPTS
) {
  if (isWeightedList(list)) {
    return randomItemsWeighted(list, count, { uniq, rand });
  }

  if (uniq && count > list.length) {
    throw new Error(
      `Can't get ${count} uniq random item(s) from a list with length=${list.length}`
    );
  }

  const result: T[] = [];

  while (result.length < count) {
    result.push(
      randomItem(list, {
        exclude: uniq ? (exclude ? exclude.concat(result) : result) : undefined,
      })
    );
  }

  return result;
}

export function randomItemsWeighted<T>(
  list: WeightedList<T>,
  count: number,
  { rand, uniq, exclude }: RandomItemsOptions<T> = DEFAULT_RAND_ITEM_OPTS
): T[] {
  if (uniq && count > list.items.length) {
    throw new Error(
      `Can't get ${count} random item(s) from a list with length=${list.items.length}`
    );
  }

  const result: T[] = [];

  while (result.length < count) {
    result.push(
      randomItemWeighted(list, {
        exclude: uniq ? (exclude ? exclude.concat(result) : result) : undefined,
        rand,
      })
    );
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
