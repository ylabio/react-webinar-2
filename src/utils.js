/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getSum(basket){
  const sum = basket.reduce((acc, val) => {
    acc += val.price * val.count;
    return acc;
  }, 0);

  return (`${sum} \u20bd`);
}
