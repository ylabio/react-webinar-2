const getPages = (current, last) => (last <= 5)
  ? '-'.repeat(last).split('').map((i, n) => n + 1)
  : (current < 3)
    ? [1, 2, 3, null, last]
    : (current === 3)
      ? [1, 2, 3, 4, null, last]
      : (current > last - 2)
        ? [1, null, last - 2, last - 1, last]
        : (current === last - 2)
          ? [1, null, last - 3, last - 2, last - 1, last]
          : [1, null, current - 1, current, current + 1, null, last];

const getLink = (page, route) =>
  (route === '/' || route === '/catalog/')
    ? '/catalog/?page=' + page
    : /page=\d+/.test(route)
      ? route.replace(/page=\d+/, `page=${page}`)
      : `${route}&page=${page}`;

export { getPages, getLink };