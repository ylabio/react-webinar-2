/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
};

export function declanation(number){ 
  let nouns = ['раз', 'раза'];
  let remainder = number % 100;
  if(remainder >=10 && remainder< 20){
    return nouns[0];
  }else{
    let newRemainder = remainder % 10;
    if(newRemainder === 1 || newRemainder === 0 || newRemainder > 4){
      return nouns[0];
    }else{
      return nouns[1]
    }
  }
};