import StateModule from "../module";

/**
 * Состояние профиля
 */
class HistoryState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      history: [],
    };
  }

  /**
   * Загрузка данных профиля
   */
  async addToHistory() {
    const history = [...this.getState().history];
    const location = window.location.pathname;
    history.push(location)
    this.setState({
      history,
    });
  }
}

export default HistoryState;
