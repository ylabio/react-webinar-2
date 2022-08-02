/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

// Для корректного склонения "раз"
export function pluralize(value, words){
  const lastTwoDigits = Math.abs(value) % 100;
  const lastDigit = lastTwoDigits % 10;
  if(lastTwoDigits > 10 && lastTwoDigits < 20) {
    return words[2];
  }
  if(lastDigit > 1 && lastDigit < 5) {
    return words[1];
  }
  if(lastDigit === 1) {
    return words[0];
  }
  return words[2];
}