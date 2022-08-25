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

  async setLang(lang) {
    this.setState({
      lang
    }, 'Смена локали');
  }
}

export default LocaleState;
