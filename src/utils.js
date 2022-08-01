/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export function countDeclination(num) {
  const lastNum = num % 10;
  const twoLastNum = num % 100;
  if (twoLastNum > 10 && twoLastNum < 20) {
    return 'раз';
  } else if (lastNum > 1 && lastNum < 5) {
    return 'раза';
  }
  return 'раз';
}
