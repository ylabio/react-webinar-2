import StateModule from "../module";

/**
 * Состояние страницы продукта
 */
class LanguageState extends StateModule{
  
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      value: 'rus'
    };
  }

  /**
   * Переключение языка
   */
  toggleLanguage() {
    let lang = '';
    lang = this.getState().value === 'rus' ? 'eng' : 'rus';

    this.setState({
      ...this.getState(),
      value: lang,
    }, 'Переключение языка');
  }

}

export default LanguageState;
