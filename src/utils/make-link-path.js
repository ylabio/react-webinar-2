/**
 * Создание пути для link
 */

export const makeLinkPath = (page, limit, sort, query, category) => {
  return `?page=${page}&limit=${limit}&sort=${sort}&query=${query}&category=${category}`
}