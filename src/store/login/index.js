import StateModule from "../module";

class LogState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */

  initState() {
    return {
      log: false,
      user: [],
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
          login: state.login,
          password: state.password,
          remember: true,
        }),
      });
      const json = await response.json();
      console.log("response", json);

      if (!json) {
        this.setState({
          ...this.store.state.login,
          log: false,
        });
      } else {
        this.setState({
          user: json.result.user,
          log: !a,
        });
      }
    } catch (e) {
      console.log("error", e);
    }
  }
}

export default LogState;
