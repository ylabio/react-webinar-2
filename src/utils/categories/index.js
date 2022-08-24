function getCategoriesArray(object, dependencies, result, count) {
  Object.keys(object).forEach(key => {

    result.push({value: object[key].id, key: object[key].key, title: `${'- '.repeat(count)}${object[key].title}`});

    if (dependencies[key]) {
      object[key] = dependencies[key];
      getCategoriesArray(object[key].children, dependencies, result, count + 1)
    }
  })
}

export default function categories(categoriesArray) {
  let mainTree = {};
  let dependencies = {};
  let result = [];

  categoriesArray.forEach(categoryItem => {
    if (categoryItem.parent) {
      if (!dependencies[categoryItem.parent._key]) {
        dependencies[categoryItem.parent._key] = {
          id: categoryItem.parent._id,
          key: categoryItem.parent._key,
          title: categoryItem.parent.title,
          children: {},
        }
      }
      dependencies[categoryItem.parent._key].children[categoryItem._key] = {
        id: categoryItem._id,
        key: categoryItem._key,
        title: categoryItem.title,
        children: {},
      };
    } else {
      mainTree[categoryItem._key] = {
        id: categoryItem._id,
        key: categoryItem._key,
        title: categoryItem.title,
        children: {},
      };
    }
  })

  getCategoriesArray(mainTree, dependencies, result, 0)

  return result;
}
