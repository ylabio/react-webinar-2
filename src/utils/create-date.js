/**
 * Преобразование времени в двухзначный формат
 * @param time {number}
 * @returns {string}
 */

function getValue(time) {
  return time.toString().length === 1 ? `0${time}` : `${time}`;
}

/**
 * Преобразование датя в формат "число" "месяц" "год" в "часы:минуты"
 * @param value {string}
 * @param lang {string}
 * @returns {string}
 */

export default function createDate(value, lang) {
  const date = new Date(value);
  const months = {
    ru: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  };
  return `${date.getDate()} ${months[lang][date.getMonth()]} ${date.getFullYear()} ${lang === 'ru' ? 'в' : 'at'} ${ getValue(date.getHours())}:${getValue(date.getMinutes())}`
}
