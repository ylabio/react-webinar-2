import counter from "../../utils/counter";
import StateModule from "../module";

/**
 * Состояние каталога
 */
class LocalizationState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      lang: ["ru", "en"],
      current: "ru",
    };
  }

  select(lng) {
    this.setState({
      ...this.getState(),
      current: lng,
    });
  }
}

export default LocalizationState;
