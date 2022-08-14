import StateModule from "../module";
import ru from "../../languages/ru.json";
import en from "../../languages/en.json";
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
      translate: ru,
      langs: ["ru", "en"],
    };
  }

  async loadLang(lang) {
    if (lang == "ru") {
      this.setState({
        translate: ru,
        langs: ["ru", "en"],
      });
    } else if (lang == "en") {
      this.setState({
        translate: en,
        langs: ["ru", "en"],
      });
    }
  }
}

export default LangState;
