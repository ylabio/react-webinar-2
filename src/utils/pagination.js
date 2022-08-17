export default function pagination(current, last) {
  let delta = 1,
    left = current - delta,
    right = current + delta,
    range = [],
    rangeWithDots = [],
    l;
  if (current === 1) right += 1;
  if (current === last) left -= 1;

  for (let i = 1; i <= last; i++) {
    if (i == 1 || i == last || (i >= left && i <= right)) {
      range.push(i);
    }
  }
  for (let i of range) {
    if (l) {
      if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
}
