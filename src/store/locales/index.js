import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class LocalesState extends StateModule{

  initState() {
    return {
      lng: 'Ru' //Значение по умолчанию
    };
  }

  /**
   * Изменение языка
   * @param lng {String} название языка
   */
  changeLng(lng){
    this.setState({
      lng
    });
  }
}

export default LocalesState;
