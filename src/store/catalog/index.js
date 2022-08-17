import counter from "../../utils/counter";
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
      currentPage: 1,
      totalCount: null,
      limit: 5,
      paginationList: [],
    };
  }

  async load(page = 1){
    let limit = this.getState().limit
    let skip = (page - 1)*limit
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    const paginationList = await this._getPages(page, json.result.count, limit)
    this.setState({
      ...this.getState(),
      items: json.result.items,
      currentPage: page,
      totalCount: json.result.count,
      limit,
      paginationList,
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
   * Удаление записи по её коду
   * @param _id
   */
  deleteItem(_id) {
    this.setState({
      items: this.getState().items.filter(item => item._id !== _id)
    }, 'Удаление товара');
  }

  _getPages(currentPage, totalCount, limit) {
    const countOfPages = Math.ceil(totalCount / limit);
    let pages = [];

    for (let i = 1; i <= countOfPages; i++) {

        if (currentPage == countOfPages && i >= countOfPages - 2) { pages.push(i) } else
        if ( i == 1 || i == countOfPages) { pages.push(i) } else
        if ((currentPage == 1 || currentPage == 2)  && i <= 3) { pages.push(i) } else
        if (currentPage == 3  && i <= 4) { pages.push(i) } else
        if (i >= currentPage - 1 && i <= currentPage + 1) { pages.push(i) }

    }

    return pages;
  };
}

export default CatalogState;
