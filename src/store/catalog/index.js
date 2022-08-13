import StateModule from "../module";

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
      count:0,
      loaded: true,
      activePage:1,
      pageSize:10,
      numOfPages:0,
    };
  }

  async load(nPage){
    setTimeout(this.setState({
      ...this.getState(),
      loaded:false}),10000)
    const response = await fetch(`/api/v1/articles?limit=${this.getState().pageSize}&skip=${((nPage||this.getState().activePage)-1)*
      this.getState().pageSize}&fields=items(*,maidIn(title,code),category(title)),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      count: json.result.count,
      loaded:true,
      activePage:nPage||this.getState().activePage,
      numOfPages:Math.ceil(json.result.count/(this.getState().pageSize)),
    });
  }

  /**
   * Создание записи
   */
  createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
    this.setState({
      items: this.getState().items.concat({_id, title, price, selected})
    }, 'Создание товара');
  }
  /**
   * Изменение активной страницы
   */
  changePage(nPage) {this.load(nPage)}

  /**
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      items: this.getState().items.filter(item => item._id !== _id)
    }, 'Удаление товара');
  }
}

export default CatalogState;
