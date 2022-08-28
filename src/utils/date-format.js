
/**
 * Форматирование даты
 * @param value
 * @returns {string}
 */

export default function dateFormat(date) {
  let newDate = new Date(date);
  return newDate
    .toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })
    .replace("г.,", "в")

}
