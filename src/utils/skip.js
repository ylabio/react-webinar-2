/**
 * Рассчитывает смещение по номеру страницы
 * @returns {number}
 */
export default function skip(page, limit){
  return (page * limit) - limit;
}
