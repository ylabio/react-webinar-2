/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

  // Окончание слов раз/раза
  export function getEndWord(countSelect) {
    countSelect = countSelect % 100;
    if (countSelect >= 10 && countSelect <= 19) return 'раз';
    countSelect = countSelect % 10;
    if (countSelect >= 2 && countSelect <= 4) return 'раза';
    return 'раз';
  }