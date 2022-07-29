/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}


export function getNoun(number, one, two, five) {
  let n = Math.abs(number);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return number + " " + five;
  }
  n %= 10;
  if (n === 1) {
    return  number + " " + one;
  }
  if (n >= 2 && n <= 4) {
    return  number + " " + two;
  }
  return five;
}
