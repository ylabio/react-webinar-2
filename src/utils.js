/**
 * Генерирует уникальный код на основе счётчика
 * @returns {number|number}
 */
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1)
}

export function formatRubPrice(num) {
  return num.toLocaleString('ru-RU', {
    currency: 'RUB',
    style: 'currency',
    minimumFractionDigits: '0'
  })
}
