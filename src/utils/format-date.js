export default function formatDate(value, options = {}) {
  return new Intl.DateTimeFormat('ru-RU', options).format(Date.parse(value));
}