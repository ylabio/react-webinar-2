/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
    return counter.value ? ++counter.value : counter.value = 1;
}

export function renderPhrase(number) {
    const lastOne = Number(number.toString().slice(-1))
    if ([12, 13, 14].indexOf(number) >= 0) {
        return "раз"
    }
    if ([2, 3, 4].indexOf(lastOne) >= 0) {
        return "раза"
    } else {
        return "раз"
    }
}