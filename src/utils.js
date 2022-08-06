/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export const getSumPrice = (products) => {
  let allProductsPrices = [];
  products.map(product => allProductsPrices.push(product.price * product.quantity));
  const sumResult = allProductsPrices.reduce(function(sum, elem) {
    return sum + elem;
  }, 0);
  return Intl.NumberFormat("ru").format(sumResult);
}

export const getAllQuantity = (products) => {
  let allQuantity = [];
  products.map(product => allQuantity.push(product.quantity));
  return  allQuantity.reduce(function(sum, elem) {
    return sum + elem;
  }, 0);
}

export function pluralize(value, words){
  const lastTwoDigits = Math.abs(value) % 100;
  const lastDigit = lastTwoDigits % 10;
  if(lastTwoDigits > 10 && lastTwoDigits < 20) {
    return words[2];
  }
  if(lastDigit > 1 && lastDigit < 5) {
    return words[1];
  }
  if(lastDigit === 1) {
    return words[0];
  }
  return words[2];
}