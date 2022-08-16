import counter from '../../utils/counter'
import StateModule from '../module'

/**
 * Состояние каталога
 */
class CatalogState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      items: [],
      skip: 0,
      count: 0,
      limit: 10,
      currentPage: 1,
    }
  }

  async load(skip = this.getState().skip, limit = this.getState().limit) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`
    )
    const json = await response.json()
    this.setState({
      items: json.result.items,
      count: json.result.count,
      currentPage: this.getState().currentPage,
      skip,
      limit,
    })
  }

  /**
   * Создание записи
   */
  createItem({ _id, title = 'Новый товар', price = 999, selected = false }) {
    this.setState(
      {
        items: this.getState().items.concat({ _id, title, price, selected }),
      },
      'Создание товара'
    )
  }

  setCurrentPage(currentPage) {
    this.setState({
      currentPage: currentPage,
      limit: this.getState().limit,
      count: this.getState().count,
      item: this.getState().item,
    })
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
      'Удаление товара'
    )
  }
}

export default CatalogState
