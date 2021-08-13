export type RandomFunc = () => number;

export type MultiRollResult = {
  result: number;
  rolls: number[];
};

export type WeightFunc<T> = (value: T) => number;

export type List<T> = T[] | WeightedList<T>;

export type WeightedListTuple<T> = { weight: number; value: T };

export type WeightedList<T> = {
  total: number;
  items: WeightedListTuple<T>[];
};

export type MarkovModel = {
  separator: string;
  tokens: {
    [token: string]: WeightedList<string>;
  };
};
