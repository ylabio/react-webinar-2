import range from 'lodash.range';
export function generatePaginationSequence(total, active, siblings, separator) {
  let pages = [];
  if (active <= siblings + 1) {
    pages = [...range(1, siblings * 2 + 2), separator, total];
  } else if (active <= siblings + 2) {
    pages = [...range(1, siblings * 2 + 3), separator, total];
  } else if (active >= total - siblings) {
    pages = [1, separator, ...range(total - siblings * 2, total + 1)];
  } else if (active >= total - siblings - 1) {
    pages = [1, separator, ...range(total - siblings * 2 - 1, total + 1)];
  } else {
    pages = [1, separator, ...range(active - siblings, active + siblings + 1), separator, total];
  }
  return pages;
}
