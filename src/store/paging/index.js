import StateModule from "../module";

/**
 * Управление пагинацией
 */
class PagingState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      currentPage: 1,
      totalPages: 0,
      limit: 10
    };
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
   * Расчет и установка общего количества страниц
   */
  setTotalPages(itemsCount) {
    const oldState = this.getState();
    const newTotalPages = Math.ceil(itemsCount / oldState.limit)

    /* Если после обновления количества товаров с сервера общее число страниц
       оказалось меньше текущей, устанавливаем текущую в начальное значение */
    if (oldState.currentPage > newTotalPages) {
      this.setState({
        ...oldState,
        currentPage: 1,
        totalPages: newTotalPages
      },'Расчет общего числа страниц и установка начальной страницы');
    } else {
      this.setState({
        ...oldState,
        totalPages: newTotalPages
      },'Расчет общего числа страниц');
    };
  }
}

export default PagingState;