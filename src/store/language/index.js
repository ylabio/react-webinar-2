import StateModule from "../module";

/**
 * Состояние каталога
 */
class LanguageState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      language: window.localStorage.getItem('language') || 'RU',
    };
  }

  selectLanguage(language) {
    window.localStorage.setItem('language', language)
    this.setState({
      language
    }, 'Смена языка');
  }
}

export default LanguageState;
