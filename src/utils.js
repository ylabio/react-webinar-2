/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function selectionsCountMessage(count) {
  const countEnd = count % 100;
  const _countEnd = count % 10;
  if(countEnd > 10 && countEnd < 20) {
    return false;
  }
  if(_countEnd > 1 && _countEnd < 5) {
    return true;
  }
  return false;
}