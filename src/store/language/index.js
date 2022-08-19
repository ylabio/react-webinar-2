import StateModule from "../module";

/**
 * Перевод страниц
 */
class LanguageState extends StateModule{

  initState() {
    return {
      currLanguage: 'RU'
    };
  }

  /**
   * Установка текущего языка страниц
   * @param currLanguage {String} Язык страниц
   */
  setCurrLanguage(language){
    this.setState({
      currLanguage: language
    }, `Текущий язык страниц ${language}`);
  }
}

export default LanguageState;
