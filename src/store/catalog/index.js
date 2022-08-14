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
			pagination: {
      	page: 1,
				total: 10
			}
    };
  }

  async load(){
  	const pagination = this.getState().pagination;
  	const lang = this.store.getState().common.language;
  	const limit = 10;
    const response = await fetch(`/api/v1/articles?lang=all&limit=${limit}&skip=${(pagination.page-1)*limit}&fields=items(*),count`);
    const json = await response.json();
    this.setState({
      items: json.result.items,
			pagination: {...pagination, total:  Math.ceil(json.result.count/limit)}
    });
  }

  setPage(newPage){
		this.setState({
			...this.state,
			pagination: {
				...this.getState().pagination,
				page: newPage
			}
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
