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

  async setLogin(a) {
    this.setState({
      log: a,
    });
  }
}

export default LogState;
