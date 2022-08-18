import StateModule from "../module";

/**
 * Состояние перевода
 */
class LocalesState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      languages: ["ru", "en"],
      language: "ru",
    };
  }

  /**
   * Выбрать язык
   * @param language {String} Язык перевода
   */
  selectLanguage(language) {
    this.setState({...this.getState(), language: language});
  }
}

export default LocalesState;