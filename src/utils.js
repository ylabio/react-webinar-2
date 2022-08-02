/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */

export function counter() {
    return counter.value ? ++counter.value : counter.value = 1;
}


/*
Функцию форматирования позаимствовал отсюда https://snipp.ru/jquery/word-declination-js.
Не хотел тратить несколько часов чтобы самому её написать, когда уже готовая в открытом доступе находится.
Склоняет так как необходимо по заданию.

*/
export function textFormatter(n, text_forms) {
    n = Math.abs(n) % 100;
    let n1 = n % 10;
    if (n > 10 && n < 20) {
        return text_forms[2];
    }
    if (n1 > 1 && n1 < 5) {
        return text_forms[1];
    }
    if (n1 == 1) {
        return text_forms[0];
    }
    return text_forms[2];
}

