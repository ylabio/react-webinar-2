import StateModule from "../module";

/**
 * Состояние каталога
 */
class ProductState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      product: null,
      isError: '',
    };
  }

  async getProduct(id){
    try {
      const response = await fetch(`api/v1/articles/${id}?fields=*,maidIn(title,code),category(title)`);
      const json = await response.json();
      const { title, description, maidIn, category, price, edition  } = json.result
      const catalog = this.store.getState()['catalog'];
      let items = [...catalog.items]; // если переходиш по прямой ссылке на продукт то его нужно добавить в state.items 
      if (!items.find(item => item._id === id)) {
        items.push(json.result)
        
      }
      this.store.setState({
        ...this.store.getState(),
        ['catalog']: {
          ...catalog,
          items
        },
        ['product']: {
          ...this.getState(),
          product: {
            title,
            description,
            country: maidIn.title,
            category: category.title,
            edition,
            price,
            id, 
        },
        }
      }, "Переход на страницу с описанием товара")
    } catch (err) {
      this.setState({
        ...this.getState(),
        isError: "Something went wrong",
      }, "Ошибка Сервера");
    }
  }

  removeProduct() {
    this.setState({
      ...this.getState(),
      product: null,
    });
  }
}

export default ProductState;
