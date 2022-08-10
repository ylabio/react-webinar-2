/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

const options = { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 };
const numberFormat = new Intl.NumberFormat('ru-RU', options);
export function getPriceFormatter(){
  return numberFormat;
}

export function getBasketTotalPrice(state) {
  let sum = 0
  for (let key in state.basket) {
    if (state.basket.hasOwnProperty(key)) {  
      sum += state.items.filter(item => item.code == key)[0].price * state.basket[key] 
    }
  }
  return sum
}