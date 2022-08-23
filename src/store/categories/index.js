import StateModule from "../module";

/**
 * Состояние категорий товара
 */
class CategoriesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      categories: []
    };
  }

  /**
   * Загрузка из api списка категорий товаров
   */
  async getCategories(){
    const response = await fetch('/api/v1/categories');
    const json = await response.json();
    const categories = json.result.items.map(cat => ({
      id: cat._id,
      title: cat.title,
      parent: cat.parent?._id
    }));

    for (let cat of categories) {
      let parent = cat.parent;
      while (parent) {
        cat.title = ' - ' + cat.title;
        parent = categories.find(c => c.id === parent).parent;
      }
    }

    categories.forEach((cat, index) => {
      if (cat.parent) {
        categories.splice(categories.findIndex(c => c.id === cat.parent) + 1, 0, cat);
        categories.splice(index + 1, 1);
      }
    })

    this.setState({
      // Если в стейте одно свойство (categories) наверное можно this.getState удалить или закомментировать
      ...this.getState(),
      categories
    }, 'Загрузка категорий товавор в стейт')
  }
}

export default CategoriesState;
