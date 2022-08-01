/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
    return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Вывод фразы с учетом числа
 */
export function convertWord(number, words) {
    return words[(number % 100 > 4 && number % 100 < 20)
        ? 2
        : [2, 0, 1, 1, 1, 2][(number % 10 < 5) ? Math.abs(number) % 10 : 5]];
}

