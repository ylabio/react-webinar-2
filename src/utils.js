/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function pluralize(num) {
  const charsForCorrection = [2, 3, 4];
  const lastChars = num.toString().slice(-2);
  const lastChar = num.toString().slice(-1);
  if(lastChars < 10 || lastChars > 20) {
    return charsForCorrection.includes(+lastChar) ? 'раза' : 'раз';
  }
  return 'раз'; 
}
