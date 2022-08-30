import moment from 'moment';

/**
 *
 * @param {string} string
 * @param {string} locale
 * @returns {string}
 */

export function formatDateIsoString(string, locale = 'ru') {
  moment.locale(locale);
  const date = moment(string).format('LLL').replace(/г.,/g, 'в');
  return date;
}
