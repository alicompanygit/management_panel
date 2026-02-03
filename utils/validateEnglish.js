export const ValidateEnglish = (input) => {
  return /^[a-zA-Z0-9_]+(?:\.[a-zA-Z0-9_]+)*$/.test(input);
};
