/**
 * Создает список категорий, для передачи в select
 * @returns {cat}
 */
export default function categoryList(categoryArray){
  
  //список категорий для отображения
  let cat =[{value:'', title: 'Все'}]
  for (let i in categoryArray) {
    if(!categoryArray[i]?.parent) {
      cat.push({value: categoryArray[i]._id, title: categoryArray[i].title})
      for (let g in categoryArray) {
        if (categoryArray[g]?.parent?._id === categoryArray[i]._id) {
          categoryArray[g].title = '-'+categoryArray[g].title;
          cat.push({value: categoryArray[g]._id, title: categoryArray[g].title})
          for (let j in categoryArray) {
            if (categoryArray[j]?.parent?._id === categoryArray[g]._id) {
              categoryArray[j].title = '--'+categoryArray[j].title;
              cat.push({value: categoryArray[j]._id, title: categoryArray[j].title})
              for (let k in categoryArray) {
                if (categoryArray[k]?.parent?._id === categoryArray[j]._id) {
                  categoryArray[k].title = '---' + categoryArray[k].title;
                  cat.push({value: categoryArray[k]._id, title: categoryArray[k].title})
                }
              }
            }  
          }
        }
      } 
    }
  }
  
  return cat
}