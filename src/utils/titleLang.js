import langs from "./langs";

/**
 * Возвращает заголовки и надписи на соответствующий язык
 * @returns {string}
 */
 export default function titleLang (selectLang, value) {
  for (const elem of langs) {
    if (elem.lang === selectLang) return elem[value];
  }
}
