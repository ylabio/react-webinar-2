import { defaulOptions } from './options';

/**
 * Преобразование даты для RU языка
 * @param {string} value
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
export default function dateFormatRU(value, options) {
  return new Intl.DateTimeFormat('ru', { ...defaulOptions, ...options })
    .format(new Date(value))
    .replace(/\s*г\./, '')
    .replace(/\s*\,/, ` в`);
}
