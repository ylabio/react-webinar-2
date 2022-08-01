/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
    return counter.value ? ++counter.value : counter.value = 1;
}

export const checkNumber = (number) => {
    const val = number % 100;
    if (val >= 2 && val < 5) {
        return 'раза';
    }
    return 'раз';
}
