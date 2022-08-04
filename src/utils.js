/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
export function displaySelected(item) {
 if (item.counter > 0) {
   return item.counter + getDisplayEnd(item.counter);
 }
 return false;
}
function getDisplayEnd(number) {
 if (number % 100 >= 10 && number % 100 <= 19) {
   return ` раз`;
 }
 if (number % 10 >= 2 && number % 10 <= 4) {
   return ` раза`;
 }
 return ` раз`;
}
