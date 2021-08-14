# Strings

Strings utility stuff.

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
