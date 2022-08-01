/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

//формирование фразы счетчика
export function counterText(itemCounter){
  let text;
  if(((itemCounter%10 >= 2) && (itemCounter%10 <= 4)) && ((itemCounter%100 < 10) || (itemCounter%100 > 20))) {
    text = "|  Выделялось "+itemCounter+" раза";
  }  
  else {
    text = "|  Выделялось "+itemCounter+" раз";
  }  
  return text;
}
