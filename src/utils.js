/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function wordDeclension(value){
  const declensions = ['раз', 'раза', 'раз'],
      cases = [2, 0, 1, 1, 1, 2];
  return declensions[ (value%100>4 && value%100<20)? 2:cases[(value%10<5)?value%10:5] ];
}
