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
      lang: false
    };
  }
  
  getLanguage(langState){
    this.setState({
      lang: !langState
    });
  }
}

export default LanguageState;
