import StateModule from "../module";

/**
 * Управление локализацией
 */
class LanguageState extends StateModule {

  initState() {
    return {
      lang: 'ru'
    };
  }

  /**
   * Установка языка сайта
   * @param lang {String} Название языка
   */
  setLang(lang) {
    this.setState({
      lang: lang
    })
  }

}


export default LanguageState;