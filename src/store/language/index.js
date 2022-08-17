import counter from "../../utils/counter";
import * as data from "../../data.json";
import StateModule from "../module";

/**
 * Состояние каталога
 */
class LanguageState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
//   initState() {
//     return {
//       lang: false
//     };
//   }
  initState() {
    return {
      lang: 'ru'
    };
  }
  
//   getLanguage(langState){
//     this.setState({
//       lang: !langState
//     });
//   }
  getLanguage(langState){
    this.setState({
      lang: langState
    });
  }

  getTranslate(code, langState){
    const dictionary = data;
    return dictionary[code][langState]
  }
}

export default LanguageState;
