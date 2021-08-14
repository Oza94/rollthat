# Markov

Utility to generate [Markov](https://en.wikipedia.org/wiki/Markov_chain) models & generators.

## `buildMarkovModel()`

Generates a markov model using input strings and given separator (default to `" "`). You can also provide a `splitInput` function that can implement more complex splitting behavior.

```typescript
function buildMarkovModel(inputs: string[], options: {
  separator: string;
  splitInput:  (input: string) => string[];
}): MarkovModel
```

See : 
- [TYPES > MarkovModel](TYPES.md#MarkovModel)

## `markovString()`

Generates a string using given `model`.

Options :

- `options.min` : minimum tokens. Default to `0` (no constraint).
- `options.max` : maximum tokens. Default to `Number.MAX_SAFE_INTEGER` (no constraint).
- `options.hardMax` : maximum tokens, hard limit. Reaching this limit stops the generator even if the end token has not been found. Default to `1000`.
- `options.maxTries` : maximum tries to attempt if generated strings does not satisfy given constraints. Default to `10`.
- `options.throwOnMaxTries` : if set to true, the function will throw if generation fails, otherwise returns null. Default to `false`.
- `options.exclude` : if given, any generated value that is included in this list will be re-generated.

> Note : the higher the constraints, the higher is the probability to fail. Make some tests with your dataset to adjust constraints for ideal output.

```typescript
function markovString(
  model: MarkovModel,
  options: {
    rand?: RandomFunc;
    exclude?: string[];
    min?: number;
    max?: number;
    hardMax?: number;
    maxTries?: number;
    throwOnMaxTries?: boolean;
  } = {}
): string | null;
```

## `markovStrings()`

Generates `count` markov strings using `model`.

Options :

- `options.uniq` : if set to true, the returned array will contains uniq values. Default to `false`.
- `options.uniqMaxTries` : max attemp(s) before giving up when generated values are not uniq.

Rest of parameters behave like in [markovString()](#markovString()) function. If `options.throwOnMaxTries` is passed to `false`, the returned array may contains less values than expected (caused by too many generation failures).

```typescript
export function markovStrings(
  model: MarkovModel,
  count: number,
  options: {
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
): string[];
```