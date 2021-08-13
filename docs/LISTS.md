# Lists

Function to pick random item(s) from lists with arbitrary values. These function accept :

- Simple lists `T[]` such as `string[]`
- Weighted lists `WeightedList<T>` such as `WeightedList<string>` (see [TYPES > WeightedList](TYPES.md#WeightedList))

Weighted lists can be used for stuff with different probabilities, e.g. :

| Value | Weight |
| :---- | :----- |
| Sunny | `5`    |
| Rain  | `3`    |
| Fog   | `1`    |
| Storm | `1`    |

In this list, "Sunny" has `50%`chances to be picked, "Rain" `30%`, "Fog" and "Storm" `10%`.

## `randomItem()`

Pick a random item from `list`.

If `options.exclude` is provided, these values will cause a new random roll.

> **Throw** : If `exclude` contains the whole input `list`, this function throws.

```typescript
function randomItem<T>(list: T[] | WeightedList<T>, options: { rand?: RandomFunc, exclude: T[] }): T
```

Example :

```typescript
// "banana"
randomItem(["apple", "banana", "orange"]); 
```

## `randomItems()`

Pick `count` random items from `list`. 

If `options.uniq` is `true` (defaults to false), the returned list is composed of uniq items. 

If `options.exclude` is provided, these values will cause a new random roll.

> **Throw** : If `count > list.length` and `uniq` is provided, the function is unable to get more random values than the input list can provide. The same applies if `exclude.length + count > list.length`, given that all `exclude` are included in the input `list`.

```typescript
function randomItems<T>(
  list: T[] | WeightedList<T>, 
  count: number, 
  options: { uniq: boolean; rand?: RandomFunc; exclude: T[] }, 
): T[]
```

Examples :

```typescript
// ["banana", "apple", "banana"]
randomItem(["apple", "banana", "orange"], 3); 

// ["banana", "apple", "orange"]
randomItem(["apple", "banana", "orange"], 3, { uniq: true });

// Error !
randomItem(["apple", "banana", "orange"], 4, { uniq: true });
```

## `createWeightedList()`

Create a `WeightedList<T>` from `WeightedListTuple<T>[]` or an arbitrary list `T[]` with a `WeightFunc`.

```typescript
function createWeightedList(list: WeightedListTuple<T>[]): WeightedList<T>;
function createWeightedList(list: T[], weightFunc: WeightFunc<T>): WeightedList<T>;
```

See : 

- [TYPES > WeightedListTuple](TYPES.md#WeightedListTuple)
- [TYPES > WeightFunc](TYPES.md#WeightFunc)

