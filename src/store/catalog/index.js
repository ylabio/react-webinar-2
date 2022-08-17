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
      currentPage: 1
    };
  }

  /**
   * Запись иформации о пагинации в модуль
   * @return {Object}
   */
  rememberPaginationInfo(page, numPerPage) {
    this.setState({
      ...this.getState(),
      currentPage: page,
      itemsPerPage: numPerPage
    }, 'Запись информации о пагинации')
  }

    /**
   * Загрузка объектов для каталога
   * @return {Object}
   */
  async load(limit, skip){
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: json.result.items,
      maxCount: json.result.count
    }, 'Загрузка каталога через API');
  }

      /**
   * Загрузка объекта для каталога по _id, если нужного нет в модуле catalog (например, при перезагрузке страницы)
   * @return {Object}
   */
  async loadFromId(_id){
    const itemsId = this.getState().items.map(item => {return item._id});
    if (!itemsId.includes(_id)) {
    const response = await fetch(`/api/v1/articles/${_id}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      items: [json.result]
    }, 'Загрузка item в каталог через API по _id');
  }
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
}

export default CatalogState;
