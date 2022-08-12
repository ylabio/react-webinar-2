import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class LanguageState extends StateModule{

  initState() {
    return {
      language: "russian"
    };
  }

  /**
   * Возвращает язык интерфейса, пригодный для использования в объекте utils -> translations
   */

  /**
   * Изменение языка интерфейса
   * @param language {String} Название модалки
   */
  set(language){
    let newLanguage
    switch(language) {
      case "Русский":
        newLanguage = 'russian'
        break
      case "Английский":
        newLanguage = 'english'
        break
      default:
        newLanguage = 'english'
        break
    }
    this.setState({
      language: newLanguage
    }, `Смена языка на ${language}`);
  }
}

export default LanguageState;
