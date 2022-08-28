import StateModule from "../module";

/**
 * Состояние языка интерфейса
 */
class LocaleState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      lang: 'ru',
    };
  }

  /**
   * Установка языка интерфейса
   * @param lang {string}
   */
  async setLang(lang) {
    this.setState({
      lang
    }, 'Установка языка интерфейса');
  }
}

export default LocaleState;
