import counter from "../../utils/counter";
import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule {
  #mainUrl = "/api/v1/articles/";
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      item: {},
      limit: 10,
      skip: 0,
      maxItems: 0,
    };
  }

  #handleResponse(response) {
    return response.ok ? response.json() : Promise.reject("Error");
  }

  async load() {
    const state = this.getState();
    const { limit, skip } = state;
    const response = await fetch(`${this.#mainUrl}?limit=${limit}&skip=${skip}&fields=items(*),count`).then(
      this.#handleResponse
    );
    this.setState(
      {
        ...state,
        items: response.result.items,
        maxItems: response.result.count,
      },
      "Загрузить данные"
    );
  }

  async setItem(id) {
    const state = this.getState();
    const response = await fetch(`${this.#mainUrl}${id}?fields=*,maidIn(title,code),category(title)`).then(
      this.#handleResponse
    );
    this.setState(
      {
        ...state,
        item: response.result,
      },
      "Установить товар"
    );
  }

  setPage(page) {
    const state = this.getState();
    this.setState(
      {
        ...state,
        skip: page * state.limit,
      },
      "Установить страницу"
    );
  }

  /**
   * Создание записи
   */
  createItem({ _id, title = "Новый товар", price = 999, selected = false }) {
    this.setState(
      {
        items: this.getState().items.concat({ _id, title, price, selected }),
      },
      "Создание товара"
    );
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState(
      {
        items: this.getState().items.filter((item) => item._id !== _id),
      },
      "Удаление товара"
    );
  }
}

export default CatalogState;
