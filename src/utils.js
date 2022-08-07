/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
import plural from "plural-ru";

export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export const calcTotalPrice = (items) => items.reduce((sum, item) => item.amount * item.price + sum, 0);
export const calcAmount = (items) => items.reduce((sum, item) => item.amount + sum, 0);
export const getInfoCart = (count, totalPrice) => `${count} ${plural(count, 'товар', 'товара', 'товаров')} / ${totalPrice.toLocaleString('ru-RU')} ₽`;
