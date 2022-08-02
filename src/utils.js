/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export const defineWordEnding = (num) => {  
    let newNum; 
    if (num >= 10) {
      if (num % 100 >= 12 && num % 100 <= 21) {
        newNum = num % 100;
      } else {
        newNum = num % 10;
      }
    } else {
      newNum = num;
    }
    if (newNum === 0 || newNum === 1 || newNum > 4 && newNum < 10 || newNum > 4 && newNum < 22) {
      return 'раз';
    } else if (newNum > 1 && newNum < 5) {
      return 'раза';
    }
  }  
