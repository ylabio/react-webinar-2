/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getCorrectEnding(number, singular, plural) {
  const arrOfDigits = Array.from(String(number), Number);
  const length = arrOfDigits.length;
  const last = arrOfDigits[length - 1];
  const preLast = arrOfDigits[length - 2];
  
  if (last >= 2 && last < 5) {
    if (preLast === 1) return singular;

    return plural;
  }

  return singular;
}