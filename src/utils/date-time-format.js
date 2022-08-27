/**
 * Форматирование даты
 * @param value
 * @param locale {string}
 * @param separator {string}
 * @returns {string}
 */
export default function dateTimeFormat(value, locale, separator = locale === 'ru' ? ' в ' : ' ') {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };
  const dateTime = new Intl.DateTimeFormat(locale, options).format(value).split(',');

  return (dateTime[0][dateTime[0].length - 1] === '.' ? dateTime[0].slice(0, -3) : dateTime[0]) + separator + dateTime[1].slice(1);
}
