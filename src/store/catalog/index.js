import {counter} from "../../utils";

/**
 * Состояние каталога
 */
class CatalogState {

  constructor(store) {
    this.store = store;
  }

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [
        {code: counter(), title: 'Название товара', price: 100.0},
        {code: counter(), title: 'Книга про React', price: 770},
        {code: counter(), title: 'Конфета', price: 33},
        {code: counter(), title: 'Трактор', price: 7955320},
        {code: counter(), title: 'Телефон iPhone XIXV', price: 120000},
        {code: counter(), title: 'Карандаши цветные', price: 111},
        {code: counter(), title: 'Товар сюрприз', price: 0},
      ]
    };
  }

  /**
   * Создание записи
   */
  createItem({code, title = 'Новый товар', price = 999, selected = false}) {
    this.store.setState({
      ...this.store.state,
      catalog: {
        items: this.store.getState().catalog.items.concat({code, title, price, selected})
      }
    });
  }

  /**
   * Удаление записи по её коду
   * @param code
   */
  deleteItem(code) {
    this.store.setState({
      ...this.store.state,
      items: this.store.getState().catalog.items.filter(item => item.code !== code)
    });
  }
}

export default CatalogState;
