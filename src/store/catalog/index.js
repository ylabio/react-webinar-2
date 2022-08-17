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
      pagesLoaded: 0,
      currentPage: 0,
      maxPage: 0
    };
  }

  async load(pagesToSkip, pagesToLoad){
    const requestURL = `/api/v1/articles?fields=items(*,maidIn(title),category(title)),count&limit=${pagesToLoad * 10}&skip=${pagesToSkip * 10}`
    const response = await fetch(requestURL);
    const json = await response.json();
    this.setState({ ...this.getState(),
      items:  [...this.getState().items].concat(json.result.items),
      pagesLoaded: this.getState().pagesLoaded+1,
      maxPage: Math.ceil(json.result.count / 10)
    });
  }

  setPage(page) {
    const currentPage = this.getState().currentPage
    const pagesLoaded = this.getState().pagesLoaded
    if(page === currentPage) return
    if(page > pagesLoaded) {
      this.load(currentPage, page-pagesLoaded)
        .then(() => this.setState({...this.getState(), currentPage: page, pagesLoaded: page}))
    } else {
      this.setState({...this.getState(), currentPage: page})
    }
  }
  // /**
  //  * Создание записи
  //  */
  // createItem({_id, title = 'Новый товар', price = 999, selected = false}) {
  //   this.setState({
  //     items: this.getState().items.concat({_id, title, price, selected})
  //   }, 'Создание товара');
  // }
  //
  // /**
  //  * Удаление записи по её коду
  //  * @param _id
  //  */
  // deleteItem(_id) {
  //   this.setState({
  //     items: this.getState().items.filter(item => item._id !== _id)
  //   }, 'Удаление товара');
  // }
}

export default CatalogState;
