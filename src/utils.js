import plural from 'plural-ru';
import propTypes from 'prop-types';

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}

export const calcTotalPrice = (items) =>
  items.reduce((price, item) => item.price * item.count + price, 0);

export const getInfoCart = (count, totalPrice) =>
  `${count} ${plural(
    count,
    'товар',
    'товара',
    'товаров'
  )} / ${totalPrice.toLocaleString('ru-RU')}`;

export const types = {
  CallbackPropsShape: {
    action: propTypes.func.isRequired,
    name: propTypes.string.isRequired,
  },
};
