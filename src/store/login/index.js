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

  async setLogin(state, a) {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: "test_1",
          password: "123456",
          remember: true,
        }),
      });
      const json = await response.json();
      console.log("response", json);
    } catch (e) {
      console.log("error", e);
    }

    if (!state.login) {
      this.setState({
        log: a,
      });
    } else {
      this.setState({
        log: !a,
      });
    }
  }
}

export default LogState;
