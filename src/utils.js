/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function pluralize(number, cases){
  let n = Math.abs(number) % 100;
  let a = n % 10;

  if (a===1 && n!==11){
    return cases[0];
  }
  else if (a>1 && a<5 && n!==12 && n!==13 && n!==14){
    return cases[1];
  }
  return cases[2];
}
