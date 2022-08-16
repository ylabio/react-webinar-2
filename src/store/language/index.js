import StateModule from "../module";

/**
 * Выбор языка
 */
class Language extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
        lang: 1
    };
  }
  // Установка состояние языка
  setLang(lang){
    this.setState({
      lang: lang
    }, `переключение языка на язык ${lang}`);
  }
}

export default Language;
