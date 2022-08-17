import StateModule from "../module";
/**
 * Состояние каталога
 */
class LangState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      currentLang: "ru",
      langs: ["ru", "en"],
    };
  }

  async loadLang(lang) {
    this.setState({
      currentLang: lang,
      langs: ["ru", "en"],
    });
  }
}

export default LangState;
