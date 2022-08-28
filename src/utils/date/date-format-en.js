import { defaulOptions } from './options';

/**
 * Преобразование даты для EN языка
 * @param {string} value
 * @param {Intl.DateTimeFormatOptions} options
 * @returns {string}
 */
export default function dateFormatEN(value, options) {
  return new Intl.DateTimeFormat('en', { ...defaulOptions, ...options }).format(new Date(value));
}
