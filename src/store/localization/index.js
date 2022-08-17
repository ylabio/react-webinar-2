import StateModule from "../module";

/**
 * Состояние языка сайта
 */
class LocalizationState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
   initState() {
    return {
      language: 'ru'
    };
  }

  changeLanguage(language){
    this.setState({
      language
    }, `Смена языка сайта`);
  }
}

export default LocalizationState;
