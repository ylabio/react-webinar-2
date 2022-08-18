import StateModule from "../module";
import {translateLanguage} from "../../utils/translate-language";

/**
 * Состояние страницы информации о товаре
 */
class TranslateState extends StateModule {
  
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      language: 'ru',
    };
  }
  
  /**
   * Поменять язык
   */
  
  changeLanguage(lang){
    this.setState({
      ...this.getState(),
      language: lang,
    })
  }
}

export default TranslateState;