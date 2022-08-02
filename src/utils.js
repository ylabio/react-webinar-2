/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}
export function endings(counter){
  let myArray = [2,3,4];
  let exceptions = [12,13,14];
  if (!exceptions.includes(counter %= 100) && myArray.includes(counter %= 10)){
    return ('раза');
  }
  else{
    return ('раз');
  }
}
