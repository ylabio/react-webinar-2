/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
    return counter.value ? ++counter.value : counter.value = 1;
}


export const getTotalPrice = (arr) => arr.reduce((sum, el) => sum + el.price * el.quantity, 0);
export const getTotalAmount = (arr) => arr.reduce((sum, el) => sum + el.quantity, 0);
