/**
 * A simple function that returns new uppercased first letter of that string
 * @param str Put in the string you want to transform the first letter in to an uppercase
 * @returns Uppercased first char + the left over chars
 */
export const firstLetterToUpperCase = (str?: string) => {
  if (!str) return '';

  const firstLetter = str[0].toUpperCase();
  const slicedStr = str.slice(1, str.length);

  return firstLetter + slicedStr;
};
