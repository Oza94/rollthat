# Strings

Strings utility stuff.

## `normalize()`

Normalize a string according to options.

`options` parameters :

- `upper` : If `true`, string is uppercased. Default to `false`
- `lower` : If `true`, string is lowercased. Default to `true`
- `diacritics` : If `false`, diacritics are replaced by their non-accent counterpart. Default to `false`

```typescript
function normalize(str: string, options: { upper: boolean; lower: boolean; diacritics: boolean }): string;
```

Example :

```typescript
normalize('\tCrème Brulée  '); // "creme brulee"
```

## `levenshtein()`

Returns the [levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) between two strings.

```typescript
function levenshtein(str1: string, str2: string): number;
```

## `splitBySyllablesFrench()`

Split a french word in syllables. The word is split in _written_ syllables vs. _oral_ syllables.

```typescript
function splitBySyllablesFrench(str: string): string[];
```

Example :

```typescript
splitBySyllablesFrench("thermomètre"); // ["ther", "mo", "mè", "tre"]
```
