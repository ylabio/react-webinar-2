import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class LanguageState extends StateModule{

  initState() {
    return {
      language: 'ru'
    };
  }

  changeLanguage(language) {
    this.setState({
      language
    })
  }
}

export default LanguageState;
