/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * для правильного вывода на экран словосочетания "1 раз" - "2 раза"
 * @param num {number} количество выделений элемента
 * @returns {string}
 */
export function checkTitleOutput(num) {
  const regex1 = /[2-4]$/;
  const regex2 = /[1][2-4]$/;

  const result = regex1.test(num) && !regex2.test(num) ? "раза" : "раз";

  return result;
}
