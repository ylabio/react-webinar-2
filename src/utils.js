/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export const declination = (n) => {
  n = Math.abs(n) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) {
    return 'раз';
  } else if (n1 > 1 && n1 < 5) {
    return 'раза';
  } else if (n1 == 1) {
    return 'раз';
  } else {
    return 'раз';
  }

}
