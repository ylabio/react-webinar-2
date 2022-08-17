import StateModule from "../module";

/**
 * Состояние каталога
 */
class ItemInfoState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: [],
      itemMadeIn: [],
      itemCategory: []
    };
  }

  async loadInfo(_id) {
    const response = await fetch(`/api/v1/articles/${_id}/?fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();
    this.setState({
      item: json.result,
      itemMadeIn: [json.result.maidIn.title, json.result.maidIn.code],
      itemCategory: json.result.category.title
    }, 'Запрос информации через API по id');
  }

// этот метод добавил лишь потому, что сначала всегда отрисовывается старое содержимое страницы с детализацей, а с помощью него, хотя бы этого нет

  clearState() {
    this.setState({
      item: [],
      itemMadeIn: [],
      itemCategory: []
    });
  }

}

export default ItemInfoState;
