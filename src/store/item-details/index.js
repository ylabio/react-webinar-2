import StateModule from '../module';

/**
 * Состояние выбранного компонента списка
 */
class ItemDetails extends StateModule {
  initState() {
    return {
      selectedItem: {}
    };
  }

  /**
   * Получение выбранного элемента списка по ID
   * @param {number} itemId
   */

  async loadItem(itemId) {
    const response = await fetch(
      `/api/v1/articles/${itemId}?fields=*,maidIn(title,code),category(title)`
    );
    const json = await response.json();

    this.setState({
      selectedItem: {...json.result}
    });
  }

  /**
   *
   * Назначение нового выбранного объекта
   */

  setSelectedItem(item) {
    this.setState({
      ...item
    });
  }
}

export default ItemDetails;
