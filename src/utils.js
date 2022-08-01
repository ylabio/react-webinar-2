/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

// Форматирование текста в зависимости от числа
export const formattingTextForNumber = (count, text1, text2) => {
  const num = count % 10;
  let endOfText = text1;

  if(count >= 11 && count <= 21){
    endOfText = text1
  }else if(num >= 2 && num <=4 ){
    endOfText = text2
  }

  return `${count}${' '}${endOfText}`
}
