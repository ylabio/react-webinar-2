/**
 * Форматирует список категорий для dropdown
 * @param {*} categories - данные категорий из API
 * @returns - сортированный список категорий
 */
function getCategoriesList(categories) {
  const items = categories.map((category) => category);

  const getCategoriesList = (items, parentId = undefined, separator = '') => {
    const orderedCategories = [];
    items.forEach((category) => {
      if (category.parent?._id === parentId) {
        category.title = separator + category.title;
        const { _id: value, title } = category;
        orderedCategories.push(
          { value, title },
          ...getCategoriesList(items, category._id, separator + '-')
        );
      }
    });
    return orderedCategories;
  };

  return getCategoriesList(items);
}

export default getCategoriesList;
