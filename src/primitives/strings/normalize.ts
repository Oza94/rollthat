export function normalize(
  str: string,
  {
    lower = true,
    upper = false,
    diacritics = false,
  }: {
    lower?: boolean;
    upper?: boolean;
    diacritics?: boolean;
  } = { lower: true, diacritics: false, upper: false }
) {
  if (!diacritics) {
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  if (lower) {
    str = str.toLowerCase();
  }

  if (upper) {
    str = str.toUpperCase();
  }

  return str.trim();
}
