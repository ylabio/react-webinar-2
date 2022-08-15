/**
 * Возвращает приоритетный язык браузера
 * @returns {string}
 */
export default function getBrowserLang() {
  return window.navigator.language.split('-')[0];
}
