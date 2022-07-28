/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Функция подбора правильного склонения
 * @param {number} n Число
 * @param {string[]} fras Список вариантов
 * @returns {string}
 */
 export function decl(n, fras) {  
	return fras[n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2];
}