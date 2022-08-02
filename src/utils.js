/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function renderCountSelection (item) {
  if(item.countSelected > 0)  {
    return  ' | Выделялось ' + item.countSelected + ' раз';
  };
 };
