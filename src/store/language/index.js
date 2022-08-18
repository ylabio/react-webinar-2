import counter from "../../utils/counter";
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
      language: 'ru',
    };
  }

  setLanguage(lang) {
    this.setState({
        language: lang
    })
  }

}

export default LanguageState;