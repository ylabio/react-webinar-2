import StateModule from "../module";

/**
 * Управление пагинацией
 */
class PagingState extends StateModule{

  initState() {
    return {
      curentPage: 1,
      itemsPerPage: 10,
      firsItemIndex: 0,
      lastItemIndex: 2,
      pageNumber: Math.ceil(this.store.getState().catalog.count / 10)
    };
  }
  /**
   * Установка новой текущей страницы
   */
  paginate(pageNumber)
  {
    this.setState({
        ...this.getState(),
        curentPage: pageNumber 
    });
    this.calcItems();
  }
  /**
   * Пересчёт данных с учётом новой текущей страницы
   */
  calcItems()
  {
    let firsItemIndex = (this.getState().curentPage - 1) * this.getState().itemsPerPage;
    let lastItemIndex = firsItemIndex + this.getState().itemsPerPage;
    let pageNumber = Math.ceil(this.store.getState().catalog.count / this.getState().itemsPerPage);
    this.setState({
        ...this.getState(),
        firsItemIndex: firsItemIndex,
        lastItemIndex: lastItemIndex,
        pageNumber: pageNumber
    });
    this.store.get('catalog').loadItems(this.getState().itemsPerPage, this.getState().firsItemIndex);
  }
}

export default PagingState;
