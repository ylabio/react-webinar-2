import StateModule from "../module";

/**
 * Состояние категорий товаров
 */
class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      cats: [{value: '', title: 'Все'}],
    };
  }

  /**
   * Загрузка списка категорий
   * @returns {Promise<void>}
   */
  async getCategories(){
    let parent = [];
    let child = [];
    let catList = [];
    let diff = [];

    // Загрузка категорий товаров из каталога
    const resCats = await fetch('api/v1/categories?lang=ru&limit=*&fields=%2A');
    const cats = await resCats.json();

    // Определяем вложенность категорий для правильного отображения выпадающего списка
    cats.result.items.forEach(item => item.hasOwnProperty('parent')
      ? child.push({value: item._id, title: item.title, parentId: item.parent._id})
      : parent.push({value: item._id, title: item.title}));

    for (let i = 0; i < parent.length; i++) {
      catList.push(parent[i]);
      for (let j = 0; j < child.length; j++) {
        if (child[j].parentId === parent[i].value) {
          child[j].title = '- '.concat(child[j].title)
          catList.push(child[j])
        }
      }
    }

    // Второй уровень вложения
    diff = child.filter(({value: id1}) => !catList.some(({value: id2}) => id2 === id1));

    for (let i = 0; i < diff.length; i++) {
      let catListIdx = catList.findIndex((item) => item.value === diff[i].parentId)
      if (catListIdx >= 0 && i === 1) {
        catList.splice(catListIdx + 1, 0, {...diff[i], title: '- - - '.concat(diff[i].title)})
      } else {
        catList.splice(catListIdx + 1, 0, {...diff[i], title: '- - '.concat(diff[i].title)})
      }
    }

    // Установка полученных данных
    this.setState({
      cats: [this.getState().cats[0], ...catList],
    });
  }
}

export default CategoriesState;
