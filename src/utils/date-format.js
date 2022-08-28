/**
 * Форматирование разрядов числа
 * @param value
 * @returns {string}
 */
export default function dateFormat(value) {
  return new Date(value)
    .toLocaleString("ru-RU", {
      dateStyle: "long",
      timeStyle: "short",
    })
    .replace("г.,", "в");
}
