import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class LocalesState extends StateModule{

  initState() {
    return {
      lng: 'Ru', //Значение по умолчанию
      Ru: {
        HEADER: 'Магазин',
        BASCKET_SHOW: 'Перейти',
        ADD_TO_BASKET: 'Добавить',
        REMOVE_FROM_BACKET: 'Удалить',
        CLOSE_BASKET: 'Закрыть',
      },
      En: {
        HEADER: 'Magazine',
        BASCKET_SHOW: 'Show basket',
        ADD_TO_BASKET: 'Add',
        REMOVE_FROM_BACKET: 'Remove',
        CLOSE_BASKET: 'Close',
      }
    };
  }

  /**
   * Изменение языка
   * @param lng {String} название языка
   */
  changeLng(lng){
    this.setState({
      ...this.store.state.locales,
      lng
    });
  }
}

export default LocalesState;
