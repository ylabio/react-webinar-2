import StateModule from "../module";
import constants from "../../API/constants";

/**
 * Управление модальными окнами
 */
class LocalesState extends StateModule{

  initState() {
    return {
      lng: 'Ru', //Значение по умолчанию
      Ru: constants.Ru,
      En: constants.En,
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
