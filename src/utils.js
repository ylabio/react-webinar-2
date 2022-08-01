/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter(){
  return counter.value ? ++counter.value : counter.value = 1;
}

export function pluralize(num, forms) {
  const result =
    forms[
      num % 10 === 1 && num % 100 !== 11
        ? 0
        : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20)
          ? 1
          : 2
      ];
  return `${num} ${result}`;
}