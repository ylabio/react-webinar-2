/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */

export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function renderCountSelection (item) {
  if(item.countSelected > 0)  {
    if(item.countSelected % 10 > 1 && item.countSelected % 10 < 5 && item.countSelected !=12 && item.countSelected !=13 && item.countSelected !=14) {
    return  ' | Выделялось ' + item.countSelected + ' раза';
    } else {
      return  ' | Выделялось ' + item.countSelected + ' раз';
    };
  };
 };
