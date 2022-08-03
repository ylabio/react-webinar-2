/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function pluralize(digit) {
  let cases = [0,1,5,6,7,8,9];
  if ( [11,12,13,14,15,16,17,18,19].indexOf(digit) !== -1){
    return 'раз'
  }
  if (cases.indexOf(digit % 10) !== -1 ){
    return 'раз'
  }
  return 'раза'
}
