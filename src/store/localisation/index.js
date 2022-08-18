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

  translate(item) {
    console.log(this.store.state.localisation.currentLanguage)
    return localisation[this.store.state.localisation.currentLanguage][item]
  }

  changeLanguage(lang) {
    console.log('исполнилось')
    console.log(lang)
    this.setState({
      currentLanguage: lang
    }, 'localisation')
  }

}

export default LocalisationState;
