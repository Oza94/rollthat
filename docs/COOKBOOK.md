# Cookbook

You can find here some recipes to directly use or that can inspire you.

## Weighted list by levenshtein distance

```typescript
import { levenshtein, createWeightedList, randomItems } from 'rollthat';

const father = 'Darin';
const names = ['Thorin', 'Durin', 'Balin', 'Oin' /* ... */];

// Weight names according to their distance from father name
const weightedNames = createWeightedList(names, name => levenshtein(father));

// Get 3 uniques names for the sons
// Names with a short distance from father's name have a higher chance to appear
const sonsNames = randomItems(weightedNames, 3, { uniq: true });
```