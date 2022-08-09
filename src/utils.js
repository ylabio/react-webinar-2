//3rd party libraries
import plural from 'plural-ru';

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
	return counter.value ? ++counter.value : (counter.value = 1);
}

/**
 * Генерирует строку с основным состоянием корзины
 * @param itemsCount {number} кол-во товаров
 * @param totalPrice {number} общая стоимтость товаров
 * @returns {String}
 */
export function getCartSnapshot(itemsCount, totalPrice) {
	return itemsCount
		? `${itemsCount} ${plural(
				itemsCount,
				'товар',
				'товара',
				'товаров',
		  )} / ${totalPrice.toLocaleString('ru-RU')}`
		: 'пусто';
}

/**
 * Вычисляет общую стоимтость входных товаров
 * @param items {Array} массив с товарми
 * @returns {number}
 */
export function computeTotalPrice(items) {
	return toRUB(
		items.reduce(
			(totalPrice, { price, count }) => totalPrice + price * count,
			0,
		),
	);
}

export function toRUB(value) {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
		currencyDisplay: 'symbol',
	}).format(value);
}
