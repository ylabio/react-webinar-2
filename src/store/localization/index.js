import json from "../../localization.json";
import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class LocalizationState extends StateModule {

  initState() {
    return {
      lang: "ru"
    };
  }

  /**
   * Задать язык интерфейса
   * @param lang {String} - ru, en, ch и т.п...
   */
  setLanguage(lang) {
    //lang = lang || "" ? lang : "ru";
    this.setState({
      lang
    });
  }

  /**
   * Возвращает текущий язык интерфейса
   * @return {String} - ru, en, ch и т.п...
   */
  getLanguage() {
    return this.getState().lang;
  }

  /**
   * Возвращает локализованный текст
   * @param keyword {string} - ключ в jsone, по которому берем текст
   * @return {String}
   */
  getLocalizedTextFor(keyword) {
    const words = json.languages[this.getLanguage()];
    if (!words)
      return '';
    return words[keyword];
  }
}

export default LocalizationState;