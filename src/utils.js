/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
    return counter.value ? ++counter.value : counter.value = 1;
}

export function countName(count) {
    const countArray = count.toString().split('');
    const preLastElement = countArray.at(-2) //Можно конверитировать в число, но я подумал легче сраавнимое значение перевести в строку
    const lastElement = countArray.pop()
    if (lastElement >= 2 && lastElement <= 4 && preLastElement !== '1') {
        return `| Выделялся ${count} раза`
    } else {
        return `| Выделялся ${count} раз`
    }
}