# Types

Types used within this library.

## Global

### `RandomFunc`

Signature of the rng function used in all random stuff. You can pass a custom rng to all function if it matches this signature.

```typescript
type RandomFunc = () => number;
```

## Dices

### `MultiRollResult`

Used to represent result of multiple dices rolls (e.g. `3d6`).

```typescript
type MultiRollResult = {
  result: number;
  rolls: number[];
};
```

## Weighted lists

### `WeightedList` 

Represents a list of weighted items. 

```typescript
type WeightedList<T> = {
  total: number;
  items: WeightedListTyple<T>[];
};
```

Example :

```typescript
const fruits: WeightedList<string> = {
  total: 6,
  items: [
    { value: 'banana', weight: 3 },
    { value: 'apple', weight: 1 },
    { value: 'orange', weight: 2 },
  ]
}
```

### `WeightedListTuple`

Represent the tuple `(value, weight)` of a weighted list item.

```typescript
type WeightedListTyple<T> = { value: T, weight: number };
```

### `WeightFunc`

Returns the weight of an item from its value.

```typescript
type WeightFunc<T> = (value: T) => number;
```