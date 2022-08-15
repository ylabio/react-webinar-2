import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class LocalizationState extends StateModule {

  initState() {
    return {
      lang: "ru"
    };
  }

  /**
   * Задать язык интерфейса
   * @param lang {String} - ru_RU, en_EN, ch_CH и т.п...
   */
  setLanguage(lang) {
    //lang = lang || "" ? lang : "ru";
    this.setState({
      lang
    });
  }

  /**
   * Возвращает текущий язык интерфейса
   * @return {String} - ru_RU, en_EN, ch_CH и т.п...
   */
  getLanguage() {
    return this.getState().lang;
  }
}

export default LocalizationState;
