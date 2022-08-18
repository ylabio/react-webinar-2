import localisation from "../../localisation.json";
import StateModule from "../module";

/**
 * Состояние локализации
 */
class LocalisationState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      currentLanguage: 'ru',
    };
  }

  translate(lang, item) {
    return localisation[lang][item]
  }

}

export default LocalisationState;
