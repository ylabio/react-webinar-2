import StateModule from "../module";
import {translateLanguage} from "../../utils/translateLanguage";

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
      words: translateLanguage('ru')
    };
  }
  
  /**
   * Поменять язык
   */
  
  changeLanguage(lang){
    this.setState({
      ...this.getState(),
      language: lang,
      words: translateLanguage(lang)
    })
  }
}

export default TranslateState;