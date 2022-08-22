// Построение иерархии категорий
export default function categoriesToHierarchy(categories) {
  // Выбираем требуемые значения из полученных с сервера данных
  // и формируем объект категорий 
  const categoriesObj = Object.fromEntries(
    categories.map((category) => [
      category._id,
      {
        value: category._id, 
        parentId: category.parent?._id, 
        title: category.title, 
        children: []
      },
    ])
  );
  // Формируем дерево категорий по иерархии в виде массива массивов
  const treeArray = Object.values(categoriesObj).filter((category) => 
    !categoriesObj[category.parentId]?.children.push(category)
  );
  // Разворичиваем массив массивов в линейный и проставляем префиксы
  const treeToArray = (treeArray, prefix = "") => {
    let result = [];
    treeArray.forEach((subTree) => {
      result = [
        ...result,
        {value: subTree.value, title: prefix + subTree.title},
        ...subTree.children && treeToArray(subTree.children, prefix + " - "),
      ];
    });
    return result;
  };
  
  return treeToArray(treeArray);
}