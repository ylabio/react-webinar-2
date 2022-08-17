export const newPages = (pagination, pages) => {
  if (pagination === pages[0] || pagination === pages[1]) {
    return [...pages.slice(0, 3), "...", pages[pages.length - 1]];
  }

  if (pagination === pages[2]) {
    return [...pages.slice(0, 4), "...", pages[pages.length - 1]];
  }

  if (
    pagination === pages[pages.length - 1] ||
    pagination === pages[pages.length - 2]
  ) {
    return [pages[0], "...", ...pages.slice(-3)];
  }

  if (pagination === pages[pages.length - 3]) {
    return [pages[0], "...", ...pages.slice(-4)];
  }

  const arr = pages.filter(
    (page) =>
      page === pagination - 1 || page === pagination || page === pagination + 1
  );

  return [pages[0], "...", ...arr, "...", pages[pages.length - 1]];
};
