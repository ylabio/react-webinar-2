export default function getCategoryHierarchy(list) {
  const categories = [];
  for (let category of list) {
    let children;
    let parent = category.parent
    // Добавляем дефисы подкатегориям
    while(parent) {
      category.title = ' - ' + category.title;
      parent = list.find(category => category.value === parent).parent;
    }
    // Сортируем категории
    if(category.parent === undefined){                                                        // Ищем корневые категории
      children = list.filter(item => item.parent === category.value);                         // Ищем первый слой подкатегорий
      if(children)                                                                            // Проверка пустых итераций
        categories.push(category, ...children);
      for(let subItem of children){
        children = list.filter(item => item.parent === subItem.value);                        // Ищем второй слой подкатегорий
        if(children)
          categories.splice(categories.indexOf(subItem) + 1, 0, ...children);
        for(let subItem of children){
          children = list.filter(item => item.parent === subItem.value);                      // Ищем третий слой подкатегорий
          if(children)
            categories.splice(categories.indexOf(subItem) + 1, 0, ...children);
        }
      }
    }
  }
  return categories;
};
/*
* export default function getCategoryHierarchy(list, pId = undefined, separator = '') {
  const categories = [];
  list.forEach((item) => {
    if (pId === item.parent) {
      item.title = separator + item.title;
      categories.push(item, ...getCategoryHierarchy(list, item.value, `${separator} - `));
    }
  });
  return categories;
}
*/