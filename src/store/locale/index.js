import StateModule from "../module";

/**
 * Состояние товара
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
