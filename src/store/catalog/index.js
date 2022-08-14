import StateModule from "../module";
import ApiService from "../../utils/api-service";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      item: {},
      count: 0,
    };
  }

  /**
   * Загрузка списка товаров
   */
  async loadItems() {
    const paging = this.store.getState().paging;
    const skip = (paging.currentPage - 1) * paging.limit;
    const response = await ApiService.getAll(paging.limit, skip);

    /* Если количество товаров, пришедшее с сервера, отличается от хранимого в store,
       то запускаем пересчет количества страниц для пагинации */
    const oldState = this.getState();
    if (oldState.count !== response.result.count) {
      this.store.get('paging').setTotalPages(response.result.count);
      this.setState({
        ...oldState,
        items: response.result.items,
        count: response.result.count
      },'Загрузка страницы товаров с сервера и установка общего числа товаров');
    } else {
      this.setState({
        ...oldState,
        items: response.result.items
      },'Загрузка страницы товаров с сервера');
    }
  }
  
  /**
   * Загрузка товара
   */
  async loadItem(_id) {
    const response = await ApiService.getOne(_id);
    this.setState({
      ...this.getState(),
      item: response.result
    },'Загрузка информации о товаре с сервера');
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    const oldState = this.getState();
    // Пересчет количества страниц для пагинации при добавлении товара
    const newCount = oldState.count + 1;
    this.store.get('paging').setTotalPages(newCount);

    this.setState({
      ...oldState,
      items: oldState.items.concat({_id, title, price, selected}),
      count: newCount
    }, 'Создание товара');
  }

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    const oldState = this.getState();
    // Пересчет количества страниц для пагинации при удалении товара
    const newCount = oldState.count - 1;
    this.store.get('paging').setTotalPages(newCount);

    this.setState({
      ...oldState,
      items: oldState.items.filter(item => item._id !== _id),
      count: newCount
    }, 'Удаление товара');
  }
}

export default CatalogState;
