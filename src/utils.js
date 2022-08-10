/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function getPrice(number){
	const formattedNumber = new Intl.NumberFormat('ru-RU').format(number);
	return `${formattedNumber}  \u20bd`;
}
