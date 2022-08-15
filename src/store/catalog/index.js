import paginationCreator from "../../utils/pagination-creator";
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
      currentPageNumber: 1, //текущий номер страницы по умолчанию 1
      items: [],
      itemsQty: null, //количество элементов
      itemsQty: 0,
      limit: 10, //количество товарв на одной странице, можно менять - пагинация подстраивается. В интерфейс можно добавить переключатель для количества отображаемых страниц
      pagination: paginationCreator()
    };
  }

  /**
   * Загрузка необходимого количества страниц
   * @param pageNumber
   */
  async load(pageNumber = 1){
    const response = await fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${(pageNumber - 1) * this.getState().limit}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      currentPageNumber: pageNumber,
      items: json.result.items,
      itemsQty: json.result.count,
      limit: this.getState().limit,
      pagination: paginationCreator(json.result.count, pageNumber, this.getState().limit)
    });
  }

  // load(pageNumber = 1){
  //   fetch(`/api/v1/articles?limit=${this.getState().limit}&skip=${(pageNumber - 1) * this.getState().limit}&fields=items(*),count`)
  //   .then(res=>res.json())
  //   .then(json => {
  //     this.setState({
  //       currentPageNumber: pageNumber,
  //       items: json.result.items,
  //       itemsQty: json.result.count,
  //       limit: this.getState().limit,
  //       pagination: paginationCreator(json.result.count, this.getState().currentPageNumber, this.getState().limit)
  //     });
  //   })
  // }

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
}

export default CatalogState;
