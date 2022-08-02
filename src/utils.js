/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
    return counter.value ? ++counter.value : counter.value = 1;
}

// Множественная форма для отображения количества выделений записи (раз, раза)
export const pluralize = (n, forms) => {
    return [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100)
        ? n + forms[0]
        : n + forms[1];
}
