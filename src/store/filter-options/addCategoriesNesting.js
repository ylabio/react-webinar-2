function addCategoriesNesting(categories) {
  const result = [];

  categories.filter(item => !item.parent).forEach(item => {
    result.push(item);

    categories.filter(_item => _item.parent && _item.parent._key === item._key).forEach(_item => {
      result.push({ ..._item, title: `- ${_item.title}` });

      categories.filter(__item => __item.parent && __item.parent._key === _item._key).forEach(__item => {
        result.push({ ...__item, title: `-- ${__item.title}` });

        categories.filter(___item => ___item.parent && ___item.parent._key === __item._key).forEach(___item => {
          result.push({ ...___item, title: `--- ${___item.title}` });
        })
      })
    })
  })

  return result;
}

export default addCategoriesNesting;