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
      count: 0,
      currentPage: 1,
      totalPages: 0,
      limit: 10
    };
  }

  /**
   * Загрузка списка товаров
   */
  async loadItems() {
    const oldState = this.getState();
    const skip = (oldState.currentPage - 1) * oldState.limit;
    const response = await ApiService.getAll(oldState.limit, skip);
    /* Если количество товаров, пришедшее с сервера, отличается от хранимого в store,
       то запускаем пересчет количества страниц для пагинации */
    if (oldState.count !== response.result.count) {
      this.setState({
        ...oldState,
        items: response.result.items,
        count: response.result.count,
        ...this.checkTotalPages(response.result.count)
      },'Загрузка страницы товаров с сервера и установка общего числа товаров');
    } else {
      this.setState({
        ...oldState,
        items: response.result.items
      },'Загрузка страницы товаров с сервера');
    }
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    const oldState = this.getState();
    // Пересчет количества страниц для пагинации при добавлении товара
    const newCount = oldState.count + 1;
    this.setState({
      ...oldState,
      items: oldState.items.concat({_id, title, price, selected}),
      count: newCount,
      ...this.checkTotalPages(newCount)
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
    this.setState({
      ...oldState,
      items: oldState.items.filter(item => item._id !== _id),
      count: newCount,
      ...this.checkTotalPages(newCount)
    }, 'Удаление товара');
  }

  /**
   * Установка текущей страницы
   */
   setPage(pageNumber) {
    this.setState({
      ...this.getState(),
      currentPage: pageNumber
    },'Установка номера страницы');
  }

  /**
   * Расчет и проверка общего количества страниц
   */
   checkTotalPages(itemsCount) {
    const oldState = this.getState();
    const newTotalPages = Math.ceil(itemsCount / oldState.limit)

    // Если общее число страниц текущей, устанавливаем текущую в начальное значение
    if (oldState.currentPage > newTotalPages) {
      return {
        currentPage: 1,
        totalPages: newTotalPages
      };
    } else {
      return {
        totalPages: newTotalPages
      };
    };
  }
}

export default CatalogState;
