/**
 * Заполняет массив страниц для отображения в пагинации
 */

export function createPages(pages, pagesCount, currentPage) {
  //заполняет массив страниц
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }
  //обрезает этот массив в зависимости от того, какая страница, чтобы вывести его в компоненте
  if (currentPage === 1) {
    pages.splice(currentPage + 3)
    pages.splice(0, 1)
  } else if (currentPage === 2) {
    pages.splice(currentPage + 2)
    pages.splice(0, 1)
  } else if (currentPage > pagesCount -3) {
    pages.splice(0, pagesCount-4)
  } else {
    pages.splice(currentPage + 1)
    pages.splice(0, currentPage - 2)
  }
}