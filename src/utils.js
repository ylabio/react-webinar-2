/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

// Склонение слова "раз"
export function renderPhrase(clickNumber) {
  const lastOne = Number(clickNumber.toString().slice(-1));
  if (clickNumber > 4 && clickNumber < 15) {
    return "раз";
  }
  if (lastOne === 1) return "раз";
  if ([2, 3, 4].indexOf(lastOne) >= 0) return "раза";
  return "раз";
}
