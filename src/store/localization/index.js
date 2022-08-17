import StateModule from "../module";

/**
 * Модуль локализации
 */
 class LocalizationState extends StateModule{

    /**
     * Начальное состояние
     * @return {Object}
     */
    initState() {
      return {
        lang: "RU"
      };
    }
    
    /**
     * Установка языка
     */
    setLang() {
      this.setState({
        lang: this.getState().lang === "RU" ? "EN" : "RU"
      },'Установка языка');
    }
  }
  
  export default LocalizationState;