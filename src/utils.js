import * as numerous from "numerous";
import enLocale from "numerous/locales/en";
import ruLocale from "numerous/locales/ru";
// два языка приведены в качестве примера
numerous.registerLocale([enLocale, ruLocale]);

/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : counter.value = 1;
}

/**
 * Обеспечивает правильную плюрализацию вывода
 * @param num {number} количество выделений элемента
 * @returns {string}
 */
export function pluralizedOutput(num) {
  const { pluralize } = numerous.create("ru");
  const variants = {
    one: "раз",
    few: "раза",
    many: "раз",
  };
  const result = pluralize(num, variants);

  return result;
}
