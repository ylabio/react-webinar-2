import langs from "./langs";

/**
 * Возвращает заголовки и надписи на соответствующий язык
 * @returns {string}
 */
 export default function titleLang (selectLang, value) {
  for (const lang in langs) {
    if (langs[lang].lang === selectLang) return langs[lang][value];
  }
}
