import StateModule from "../module";

/**
 * Состояние товара
 */
class CategoryState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
    };
  }

  /**
   * Загрузка категорий
   */
  async loadCategory(){
    const response = await fetch('/api/v1/categories');
    const json = await response.json();

    // Функция для выбора правильной позиции сортировки
    function pickPositionToSort(sortedData, parentId, index){
      if (sortedData[index+1] && sortedData[index+1].parent?._key === parentId){
        index = index + 1
      return pickPositionToSort(sortedData, parentId, index)
      }
      return index
    }

    let sortedData = [];

    // Сортируем данные с API в виде "Родитель-дочерний"
    json.result?.items.forEach(category => {
      if(category.parent == null ) {
        sortedData.push(category);
      }
      else {
        let parentId = category.parent?._key;
        let index = sortedData.findIndex(item => {
          return item._key == parentId;
        });
        // применяем функцию для выбора правильной позиции сортировки
        index = pickPositionToSort(sortedData, parentId, index);
        sortedData.splice(index+1, 0, category);
      };
    });

    // Функция для формирования title
    function editTitle(category, title){
      const parentId = category.parent?._key;
      if (parentId) {
        title = '- ' + title;
        const parent = sortedData.find(item => {
         return item._key == parentId
        });
        return editTitle(parent, title)
      } else {
        return title
      }
    }

    // Редактируем title у сортированного списка
    const items = sortedData.map(category => {
      // применяем функцию для формирования title
      const title = editTitle(category, category.title)
      return {value: category._id, title}
    });

    // Меняем состояние
    this.setState({
      items: [{ value: '', title: 'Все'}, ...items]
    });
  }
}

export default CategoryState;
