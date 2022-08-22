export function categoriesMap(items, parentId = undefined, level = 0) {
  const it = items.filter((item) => {
    if (item.parent?._id == parentId) {
      return true;
    }
    return false;
  });
  return it.reduce((prev, item) => {
    let title = item.title;
    for (let i = 0; i < level; i++) {
      title = '-' + title;
    }
    const cur = [{ ...item, title }].concat(categoriesMap(items, item._id, level + 1));
    return prev.concat(cur);
  }, []);
}
