import StateModule from "../module";
import dictionary from"../../utils/dictionary.json"

class LangState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  
  initState() {
    
    return {
      dictionary:{...dictionary.russian}
    };
  }  
  /**
   * Изменение языка
   */
  changeLang(lang) {
    this.setState({
      ...this.getState(),
      dictionary: {...dictionary[lang]}}, 'Смена языка');
  }
  }

export default LangState;
