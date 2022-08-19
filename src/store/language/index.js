import StateModule from "../module";

/**
 * Состояние локализации
 */
class LanguageState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      language: 'ru',
    };
  }

  /**
   * Изменение языка сайта
   * @param language Язык перевода
   */
   selectLanguage(language) {

    this.setState({
      ...this.getState(),
     language
    }, 'Изменение языка');
  }

}

export default LanguageState;
