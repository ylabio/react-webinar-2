/**
 * Форматирование даты
 * @param dateString
 * @returns {string}
 */
export const dateFormat = (dateString) => {
  const dateFormat = new Intl.DateTimeFormat('ru-RU', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: 'numeric', minute: 'numeric',
  });
  const date = new Date(dateString);
  return dateFormat.format(date).replace('г.,', 'в');
}