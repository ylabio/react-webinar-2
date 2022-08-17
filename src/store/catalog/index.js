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
			isLoading: false,
			limit: 10,
			pagesCount: 0,
			currPage: 1
    };
  }

  async load(limit, skip){
		this.setIsLoading(true);
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
			...this.store.state.catalog,
			items: json.result.items,
			pagesCount: Math.ceil(json.result.count / limit),
			isLoading: false
    });
  }

	setCurrPage(page) {
		this.setState({
			...this.store.state.catalog,
			currPage: page
		}, 'Запись текущей страницы');
	}

	setIsLoading(flag){
		this.setState({
			...this.store.state.catalog,
			isLoading: flag
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
}

export default CatalogState;
