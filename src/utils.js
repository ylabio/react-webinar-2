/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getCountCase(amount){
  const lastDigit = amount % 10;
  const twoLastDigits = amount % 100;

  if ([2, 3, 4].includes(lastDigit) && !([12, 13, 14].includes(twoLastDigits))) {
    return 'раза';
  }

  return 'раз';
}
