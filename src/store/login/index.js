import StateModule from "../module";

class LogState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */

  initState() {
    return {
      log: false,
      user: {},
      waiting: false,
    };
  }

  async setLogin(state, a) {
    try {
      this.setState({
        ...this.store.state.login,
        waiting: true,
      });

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

      if (json.error) {
        this.setState({
          user: { error: json.error.data.issues[0].message },
          log: false,
          waiting: false,
        });
      } else {
        this.setState({
          user: {
            name: json.result.user.profile.name,
            phone: json.result.user.profile.phone,
            email: json.result.user.email,
          },
          log: !a,
          waiting: false,
        });

        localStorage.setItem("token", json.result.token);
      }
    } catch (e) {
      console.log("error", e);
    }
  }

  // async setAuth(token) {
  //   console.log("start token", token);
  // }

  async setAuth(token) {
    try {
      const response = await fetch("/api/v1/users/self", {
        headers: { "X-Token": token },
      });

      const json = await response.json();

      if (!json) {
        this.setState({
          ...this.store.state.login,
          log: false,
        });
      } else {
        this.setState({
          ...this.store.state.login,
          user: {
            name: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email,
          },
          log: true,
        });
      }
    } catch (e) {}
  }

  async setDelete(token) {
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: { "X-Token": token },
      });
      const json = await response.json();

      console.log("response", json);
      if (!json) {
        this.setState({
          ...this.store.state.login,
        });
      } else {
        this.setState({
          user: {},
          log: false,
          waiting: false,
        });
      }

      localStorage.removeItem("token");
    } catch (e) {}
  }
}

export default LogState;
