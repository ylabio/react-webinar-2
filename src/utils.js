/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
    return counter.value ? ++counter.value : counter.value = 1;
}

export function getEnding(number) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) {
        return `${number} раз`;
    }
    n %= 10;
    if (n === 1) {
        return `${number} раз`;
    }
    if (n >= 2 && n <= 4) {
        return `${number} раза`;
    }
    return `${number} раз`;
}

