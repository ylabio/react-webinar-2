import dateFormatEN from './date-format-en';
import dateFormatRU from './date-format-ru';

const dateFunctions = {
  ['ru']: dateFormatRU,
  ['en']: dateFormatEN,
};

/**
 * Преобразование даты
 * @param {string} [lang="ru"] язык приложения
 * @param {string} value дата в виде строки
 * @param {Intl.DateTimeFormatOptions} [options={}]
 * @returns {string}
 */
export default function dateFormat(lang = 'ru', value, options = {}) {
  return dateFunctions[lang](value, options);
}
