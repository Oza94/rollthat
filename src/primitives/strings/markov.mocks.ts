import { MARKOV_ENDTOK, MARKOV_STARTTOK } from "./markov";

export const dataset1Mock = ["a good start", "the good start", "a good end"];

export const dataset1BisMock = [
  "a1544good7894start",
  "the7841good4658start",
  "a45613good4568end",
];

export const model1Mock = {
  tokens: {
    [MARKOV_STARTTOK]: {
      total: 3,
      items: [
        { value: "a", weight: 2 },
        { value: "the", weight: 1 },
      ],
    },
    a: {
      total: 2,
      items: [{ value: "good", weight: 2 }],
    },
    the: {
      total: 1,
      items: [{ value: "good", weight: 1 }],
    },
    good: {
      total: 3,
      items: [
        { value: "start", weight: 2 },
        { value: "end", weight: 1 },
      ],
    },
    start: {
      total: 2,
      items: [{ value: MARKOV_ENDTOK, weight: 2 }],
    },
    end: {
      total: 1,
      items: [{ value: MARKOV_ENDTOK, weight: 1 }],
    },
  },
  separator: " ",
};

export const dataset2Mock = ["banana", "ananas"];

export const model2Mock = {
  separator: "",
  tokens: {
    [MARKOV_STARTTOK]: {
      items: [
        {
          value: "b",
          weight: 1,
        },
        {
          value: "a",
          weight: 1,
        },
      ],
      total: 2,
    },
    a: {
      items: [
        {
          value: "n",
          weight: 4,
        },
        {
          value: MARKOV_ENDTOK,
          weight: 1,
        },
        {
          value: "s",
          weight: 1,
        },
      ],
      total: 6,
    },
    b: {
      items: [
        {
          value: "a",
          weight: 1,
        },
      ],
      total: 1,
    },
    n: {
      items: [
        {
          value: "a",
          weight: 4,
        },
      ],
      total: 4,
    },
    s: {
      items: [
        {
          value: MARKOV_ENDTOK,
          weight: 1,
        },
      ],
      total: 1,
    },
  },
};
