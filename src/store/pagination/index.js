import StateModule from "../module";

/**
 * Состояние пагинации
 */
class PaginationState extends StateModule{
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
        itemsNuberPerPage: 10, // Дефолт значение количества товаров на страницу
        itemsQuantity: 'idle',
        activePage: 'idle', 
    };
  }

  async load(){
    const pathToQuantity = '/api/v1/articles?limit=20&skip=10&fields=items(*),count'
    const itemsResposne = await fetch(pathToQuantity)
    const itemsQuantity = await itemsResposne.json()
    this.setState({
      ...this.store.state.pagination,
      itemsQuantity: itemsQuantity.result.count,
      activePage: 0, // По загрузке приложение первая страница имеет индекс 0
    });
  }

  setActivePage(_indexNumber){
    this.setState({
      ...this.store.state.pagination,
      activePage: _indexNumber,
    });
  }
}

export default PaginationState;
