/**
 * Генерирует уникальный код на основе счётчика
 * @returns {*[]}
 */
export default function pages(totalPage){
  const pageArr = []
  for (let  i=1; i<=totalPage; i++) {
    pageArr.push(i)
  }
  return pageArr
}
