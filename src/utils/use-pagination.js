import { useMemo } from "react"

/**
 * Хук для получения элементов пагинации.
 * Вынес ради чистоты компонента пагинации + так удобнее тестировать, наверно 
 * @param {number} current Текущая страница
 * @param {number} total Всего страниц
 * @returns {(string|number)[]} Массив с содержанием элементов пагинации
 * @example const elements = usePagination(1, 13); // Вернёт [1, 2, 3, '...', 13]
 * const elements = usePagination(3, 5); // Вернёт [1, 2, 3, 4, 5]
 * const elements = usePagination(7, 13); // Вернёт [1, '...', 6, 7, 8, '...', 13]
 */
const usePagination = (current, total) => useMemo(() => {
  const raw = Array.from({length: total}, (_, x) => x + 1)

  if (raw.length < 5 || current === 3 && raw.length === 5) return raw
  if ([1, 2].includes(current)) return [1, 2, 3, '...', total]
  if (current === 3) return [1, 2, 3, 4, '...', total]
  if ([total - 1, total].includes(current)) return [1, '...', total - 2, total - 1, total]
  if (current === total - 2) return [1, '...', total - 3, total - 2, total - 1, total]

  return [1, '...', current - 1, current, current + 1, '...', total]
}, [current, total])

export default usePagination