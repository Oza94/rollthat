import { randomItemWeighted } from "../objects/lists";
import { MarkovModel, RandomFunc, WeightedListTuple } from "../types";

export const MARKOV_STARTTOK = "@@_";
export const MARKOV_ENDTOK = "_@@";

export function buildMarkovModel(
  inputs: string[],
  separator: string = " "
): MarkovModel {
  const model: MarkovModel = {
    tokens: {},
    separator,
  };

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];
    const tokens = input.split(separator);
    for (let t = 0; t < tokens.length + 1; t++) {
      const token = t < tokens.length ? tokens[t] : MARKOV_ENDTOK;
      const prevToken = t > 0 ? tokens[t - 1] : MARKOV_STARTTOK;

      if (!model.tokens[prevToken]) {
        model.tokens[prevToken] = {
          total: 0,
          items: [],
        };
      }

      const prevTokenList = model.tokens[prevToken];
      let tokenItem = prevTokenList.items.find((item) => item.value === token);

      if (tokenItem) {
        tokenItem.weight += 1;
      } else {
        prevTokenList.items.push({
          value: token,
          weight: 1,
        });
      }

      prevTokenList.total += 1;
    }
  }

  return model;
}

export function rawMarkovString(
  model: MarkovModel,
  {
    rand,
    min,
    hardMax,
  }: {
    rand?: RandomFunc;
    min?: number;
    hardMax?: number;
  } = {}
) {
  hardMax = hardMax || 1000;
  min = min || 0;
  const result: string[] = [];

  while (true) {
    const prevToken =
      result.length > 0 ? result[result.length - 1] : MARKOV_STARTTOK;
    const token = randomItemWeighted(model.tokens[prevToken], {
      rand,
      exclude: result.length < min ? [MARKOV_ENDTOK] : undefined,
    });
    if (token === MARKOV_ENDTOK) {
      break;
    }
    result.push(token);
    if (result.length > hardMax) {
      throw new Error(
        `Maximum number of tokens (${hardMax}) reached without end token.`
      );
    }
  }

  return result.join(model.separator);
}

export function markovString(
  model: MarkovModel,
  {
    rand,
    min,
    max,
    hardMax,
    maxTries,
    exclude,
    throwOnMaxTries,
  }: {
    rand?: RandomFunc;
    min?: number;
    max?: number;
    hardMax?: number;
    maxTries?: number;
    exclude?: string[];
    throwOnMaxTries?: boolean;
  } = {}
) {
  maxTries = maxTries || 10;
  max = max || Number.MAX_SAFE_INTEGER;
  let result = "";

  for (let i = 0; i < maxTries; i += 1) {
    try {
      result = rawMarkovString(model, { rand, min, hardMax });
      if (result.length <= max && (!exclude || !exclude.includes(result))) {
        return result;
      }
    } catch (error) {}
  }

  if (throwOnMaxTries) {
    throw new Error(`Tried to generate string ${maxTries} without success`);
  }

  return null;
}

export function markovStrings(
  model: MarkovModel,
  count: number,
  {
    uniq,
    uniqMaxTries,
    exclude,
    ...options
  }: {
    exclude?: string[];
    uniq?: boolean;
    uniqMaxTries?: number;
    rand?: RandomFunc;
    min?: number;
    max?: number;
    hardMax?: number;
    maxTries?: number;
    throwOnMaxTries?: boolean;
  } = {}
) {
  uniqMaxTries = uniqMaxTries || 10;

  const result: string[] = [];

  for (let i = 0; i < count; i += 1) {
    try {
      let str = null;
      let tries = 0;

      do {
        str = markovString(model, options);
        tries += 1;
        if (tries > uniqMaxTries) {
          if (options.throwOnMaxTries) {
            throw new Error(
              `Failed to generate a markov string after ${uniqMaxTries} attempt(s).`
            );
          }
          break;
        }
      } while (
        (uniq && (str === null || result.includes(str))) ||
        (exclude && (str === null || exclude.includes(str)))
      );

      if (str) {
        result.push(str);
      }
    } catch (error) {
      if (options.throwOnMaxTries) {
        throw error;
      }
    }
  }

  return result;
}
