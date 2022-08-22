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
      lang: 'ru'
    };
  }

  async load() {
    const lang = localStorage.getItem('lang') || 'ru';
    this.setState({
      lang
    });
  }

  /**
   * Выбранный язык
   * @param string
   */
  setLang(lang) {
    this.setState({
      lang
    }, 'Выбранный язык');
  }
}

export default LanguageState;
