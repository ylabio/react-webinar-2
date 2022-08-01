/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Генерирует правильное склонение в зависимости от числа
 * 
 * */
export function getPlural (number){
  return [2,3,4].includes(number % 10) && !([12,13,14].includes(number % 100)) 
  ? `${number} раза` 
  : `${number} раз`;

}