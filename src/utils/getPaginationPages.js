export default function getPaginationPages (current, last) {
  return (current === 1 || current === 2)
    ? [1, 2, 3, '...', last]
    : (current === 3)
      ? [1, 2, 3, 4, '...', last]
      : (current === last || current === last - 1)
        ? [1, '...', last - 2, last - 1, last]
        : (current === last - 2)
          ? [1, '...', last - 3, last - 2, last - 1, last]
          : [1, '...', current - 1, current, current + 1, '... ', last] // второе многоточие с пробелом, чтобы не ругался map key
};