/**
 * Создает список категорий, для передачи в select
 * @returns {cat}
 */
export default function categoryList(categoryArray){

  //список категорий для отображения
  let cat =[{value:'', title: 'Все'}]
  let parents = [];
  let children = [];
  let grandchildren = [];
  //формирование дерева
  for (let i in categoryArray) {
    if (!categoryArray[i]?.parent)
      parents.push(categoryArray[i]);
    else
      children.push(categoryArray[i]);
  }
  for (let i in children) {
    for (let j in children) {
      if (children[j].parent._id === children[i]._id)
        grandchildren.push(children[j]);
    }
  }
  //сборка каталога по дереву
  for (let i in parents) {
    cat.push({value: parents[i]._id, title: parents[i].title});
    for (let j in children) {
      if (children[j].parent._id === parents[i]._id) {
        cat.push({value: children[j]._id, title: '- ' + children[j].title});
        for (let k in grandchildren) {
          if (grandchildren[k].parent._id === children[j]._id) {
            cat.push({value: grandchildren[k]._id, title: '- - ' + grandchildren[k].title});
          }
        }
      }
    }
  }
  
  return cat
}