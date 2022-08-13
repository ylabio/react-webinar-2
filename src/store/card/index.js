import StateModule from "../module";

/**
 * Состояние корзины
 */
class CardState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      item: {},
      isFetching: false,
    };
  }

  async getGoodById(id) {
    this.#setIsFetching(true);
    const lang = this.store.state.language.language;
    const response = await fetch(`/api/v1/articles/${id}?lang=${lang}&fields=*,maidIn(title,code),category(title)`);
    const json = await response.json();

    this.setState({
      ...this.store.state.card,
      item: json.result,
      isFetching: false,
    })
  }

  #setIsFetching(flag) {
    this.setState({
      ...this.store.state.card, 
      isFetching: flag,
    })
  }
}

export default CardState;
