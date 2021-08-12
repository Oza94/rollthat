# Primitives

Simple functions used to generate primitive values.

## `randomInt()`

Generate a random integer between `min` (inclusive) and `max` (exclusive).

```typescript
function randomInt(min: number, max: number, rand: RandomFunc): number;
```

## `randomFloat()`

Generate a random float between `min` (inclusive) and `max` (exclusive).

```typescript
function randomFloat(min: number, max: number, rand: RandomFunc): number;
```

## `rollDice()`

Generate an integer between `1` (inclusive) and `faces` (inclusive).

```typescript
function rollDice(faces: number, rand: RandomFunc): number;
```

## `rollDices()`

Generate multiple integers between `1` (inclusive) and `faces` (inclusive).

```typescript
function rollDice(count: number, faces: number, rand: RandomFunc): MultiRollResult;
```

See [TYPES > MultiRollResult](TYPES.md#MultiRollResult).