export function makeIndentation(level) {
  if (30 * level > 330) {
    const maxLevel = 11;
    const diff = level - maxLevel;
    let result = 30 * level - 30 * (level - maxLevel + diff);
    if (result <= 0 && level !== 0) {
      result = 0;
      result += 15;
    }
    return result;
  } else if (30 * level <= 330) {
    let result = 30 * level;
    return result;
  }
}
