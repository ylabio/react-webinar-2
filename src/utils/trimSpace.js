export const trimSpace = (str) =>
  str
    .replace(/^[\s]*/, "")
    .replace(/[\s]*$/, "")
    .replace(/\n{2,}/g, "\n")
    .replace(/\s{2,}/g, " ");
    