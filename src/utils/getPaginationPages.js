export default function getPaginationPages (current, last) {
  const calc = arr => arr.map((item, index) => {
    item = (item === 's') ? { type: 'space' }
      : (typeof item === 'string') ? { type: 'current', value: +item }
        : { type: 'link', value: item }
    item.key = index;
    return item;
  });

  const result = (current === 1)
    ? calc(['1', 2, 3, 's', last])
      : (current === 2)
      ? calc([1, '2', 3, 's', last])
        : (current === 3)
        ? calc([1, 2, '3', 4, 's', last])
          : (current === last)
          ? calc([1, 's', last-2, last-1, last+''])
            : (current === last - 1)
            ? calc([1, 's', last-2, last-1+'', last])
              : (current === last - 2)
              ? calc([1, 's', last-3, last-2+'', last-1, last])
                : calc([1, 's', current-1, current+'', current+1, 's', last]);

  console.log('--paginationPages:', result); // так понятней
  return result;
};