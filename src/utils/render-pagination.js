export const renderPagination = (allPages, currentPage) => {
  const arrPage = [];

  if (currentPage < 2)
    for (let i = 1; i < 3; i++) arrPage.push(i)
  if (currentPage > allPages - 3)
    for (let i = allPages - 3; i < allPages - 1; i++) arrPage.push(i)
  if (currentPage >= 2 && currentPage <= allPages - 3)
    for (let i = currentPage - 1; i <= currentPage + 1; i++) arrPage.push(i)

  return arrPage;
}