/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function formatPrice(price){
	return price.toLocaleString('ru-RU');
}

export function calculateTotalPrice(cartItems){
	return cartItems.reduce((totalPrice, currObject) => totalPrice + (currObject.price * currObject.totalCount), 0);
}
