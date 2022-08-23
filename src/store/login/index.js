import StateModule from "../module";

class LogState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */

  initState() {
    return {
      log: false,
      user: { load: "load" },
      waiting: false,
    };
  }

  async setLogin(a, state) {
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

  async setAuth(token) {
    try {
      this.setState({
        ...this.store.state.login,
        waiting: true,
      });

      const response = await fetch("/api/v1/users/self", {
        headers: { "X-Token": token },
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
            name: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email,
          },
          log: true,
          waiting: false,
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

      if (!json) {
        this.setState({
          ...this.store.state.login,
        });
      } else {
        this.setState({
          user: { error: "Требуется авторизация" },
          log: false,
          waiting: false,
        });
      }

      localStorage.removeItem("token");
    } catch (e) {}
  }
}

export default LogState;
