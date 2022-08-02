/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getLineEnd(selectCount){
  if ((selectCount < 10 || selectCount > 20) && (selectCount % 10 >= 2 && selectCount % 10 <= 4))
    return 'раза'
  return 'раз'
}