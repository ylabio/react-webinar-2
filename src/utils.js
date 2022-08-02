/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
    return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Определяет показывать или нет фразу "Выделялось N раз"
 */
export function showNumberOfFocus(focusCount) {
    const plural = require('plural-ru');

    if (focusCount > 0) return ` | Выделялось ${plural(focusCount, '%d раз', '%d раза', '%d раз')}`
}

