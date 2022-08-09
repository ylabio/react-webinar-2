import plural from 'plural-ru';
/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

export function TotalSum(basket) {


  const quantityProduct = basket.reduce((accum, item) => { return accum + (item.amount ? item.amount : 1) }, 0);
  const totalPrice = new Intl.NumberFormat().format(basket.reduce((accum, item) => { return accum + (item.amount ? item.price * item.amount : item.price) }, 0));
  const uniqueProdict = `${basket.length}  ${plural(basket.length, 'товар', 'товара', 'товаров')}`;



  return [quantityProduct, totalPrice, uniqueProdict];
}



