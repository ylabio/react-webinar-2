export default function nestedCategories(cats) {
  let result = [];

  cats.forEach(item => {
    if (!item.parent) result.push(item);
  });

  cats.forEach((item) => {
    if (item.parent) {
      const index = result.findIndex(resItem => resItem._key === item.parent._key && !resItem.parent);
      if (index !== -1) result.splice(index + 1, 0, { ...item, title: '-' + item.title, });
    }
  })

  cats.forEach(item => {
    if (item.parent) {
      const index = result.findIndex(resItem => resItem._key === item.parent._key && /^-[^-]/.test(resItem.title))
      if (index !== -1) result.splice(index + 1, 0, { ...item, title: '--' + item.title, });
    }
  })

  cats.forEach(item => {
    if (item.parent) {
      const index = result.findIndex(resItem => resItem._key === item.parent._key && resItem.title.startsWith('--'))
      if (index !== -1) result.splice(index + 1, 0, { ...item, title: '---' + item.title, });
    }
  })

  result = result.map(item => {
    item.value = item._id;
    return item;
  });

  result.unshift({
    value: '',
    title: 'Все',
  });

  return result;
}