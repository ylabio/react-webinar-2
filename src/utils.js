/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
    return counter.value ? ++counter.value : counter.value = 1;
}

export const checkNumber = (number) => {
    const val = number % 100;
    const lastNumbers = val % 10;
    if ((lastNumbers >= 2 && lastNumbers < 5) && !(val >= 12 && val < 15)) {
        return 'раза';
    }
    return 'раз';
}
