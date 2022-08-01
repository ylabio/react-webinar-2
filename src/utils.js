/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function isPlural(n) {
	n = Math.abs(n) % 100;
	return Math.floor(n / 10) != 1 && n % 10 >= 2 && n % 10 <= 4;
}
