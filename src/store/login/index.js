import StateModule from "../module";

class LogState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */

  initState() {
    return {
      log: false,
    };
  }

  async setLogin() {
    this.setState({
      log: true,
    });
  }
}

export default LogState;
