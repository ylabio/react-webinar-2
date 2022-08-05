import plural from "plural-ru";

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export function get_cart_total_values(cart) {
  let total_price = 0,
    total_quantity = 0;
  cart.forEach((item) => {
    total_price += item.price * item.quantity;
    total_quantity += item.quantity;
  });
  return { total_price, total_quantity };
}
