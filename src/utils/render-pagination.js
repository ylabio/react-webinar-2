export const renderPagination = (allPages, currentPage) => {
  const arrPage = [];
  const firstDots = currentPage >= 4 && allPages > 5;
  const lastDots = currentPage <= allPages - 3 && allPages > 5;

  if (currentPage <= 2)
    for (let i = 2; i <= 3; i++) arrPage.push(i)
  if (currentPage > allPages - 2)
    for (let i = allPages - 2; i < allPages; i++) arrPage.push(i)
  if (currentPage > 2 && currentPage <= allPages - 2)
    for (let i = currentPage - 1; i <= currentPage + 1; i++) arrPage.push(i)

  return {arrPage, firstDots, lastDots};
}