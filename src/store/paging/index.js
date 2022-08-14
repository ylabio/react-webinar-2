import StateModule from "../module";

/**
 * Управление пагинацией
 */
class PagingState extends StateModule{

  initState() {
    return {
      curentPage: 1,
      itemsPerPage: 1,
      firsItemIndex: 0,
      lastItemIndex: 2,
      pageNumber: Math.ceil(this.store.getState().catalog.items.length / 2),
      curentItems: this.store.getState().catalog.items.slice(0, 2)
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
    let curentItems = this.store.getState().catalog.items.slice(firsItemIndex, lastItemIndex);
    let pageNumber = Math.ceil(this.store.getState().catalog.items.length / this.getState().itemsPerPage);
    this.setState({
        ...this.getState(),
        firsItemIndex: firsItemIndex,
        lastItemIndex: lastItemIndex,
        curentItems: curentItems,
        pageNumber: pageNumber
    });
  }
}

export default PagingState;
