export const groupCategories = (categories) => {
  // Создаю новый массиы в который буду группировать категории
  const newArr = [];
  let count = 0;

  // Добавляем в новый массив главные категории
  categories.map((item, index) => {
    if(!item.parent) {
      newArr.splice(count, 0, item);
      newArr[count].group = count + 1;
      count++;
    }
  })

  count = 0;
  // Функция которая добавляет под каждую категория дочерний элемент
  const groupCat = () => {
    let arrows = '';
    count++;
    for (let i = 1; i <= count; i++) {
      arrows = arrows + '- ';
    }
    categories.map((item, index) => {
      newArr.map((itemNew, indexNew) => {
        if(itemNew.group === count && item.parent?._key === itemNew._key) {
          newArr.splice(indexNew + 1, 0, item);
          newArr[indexNew + 1].group = count + 1;
          newArr[indexNew + 1].title = arrows + newArr[indexNew + 1].title;
        }
      })
    })

    // Зацыкливание пока новый массив не станет таким же как основной
    if (categories.length !== newArr.length) {
      groupCat.apply(this);
    }
  }

  groupCat();

  return newArr;
}