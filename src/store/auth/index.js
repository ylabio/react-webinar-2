import StateModule from "../module";

/**
 * Состояние товара
 */
class AuthState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: "",
      user: null,
      waiting: false,
      errors: null,
    };
  }

  async logIn(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true,
      errors: null,
    });

    try {
      const res = await fetch(`/api/v1/users/sign`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });
      const json = await res.json();

      if (json.error) {
        this.setState({
          ...this.getState(),
          errors: json.error.data?.issues,
          waiting: false,
        });
        return;
      }
      localStorage.setItem("generalToken-ylab", json.result.token);

      this.setState({
        ...this.getState(),
        token: json.result.token,
        user: json.result.user,
        waiting: false,
        errors: null,
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getUser() {
    const localToken = localStorage.getItem("generalToken-ylab");

    if (localToken && !this.getState().token) {
      this.setState({
        ...this.getState(),
        waiting: true,
      });

      try {
        const res = await fetch("/api/v1/users/self", {
          method: "GET",
          headers: {
            "X-Token": localToken,
          },
        });

        const json = await res.json();

        this.setState({
          ...this.getState(),
          user: json.result,
          token: localToken,
          waiting: false,
          errors: null,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async resetUser() {
    this.setState({
      ...this.state,
      waiting: true,
      errors: null,
    });

    const token =
      this.getState().token || localStorage.getItem("generalToken-ylab");

    if (token) {
      try {
        const res = await fetch("/api/v1/users/sign", {
          method: "DELETE",
          headers: {
            "X-Token": token,
          },
        });
        const json = await res.json();
        localStorage.removeItem("generalToken-ylab");

        this.setState({
          user: null,
          token: "",
          waiting: false,
          errors: null,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }

  async resetErrors() {
    this.setState({
      ...this.getState(),
      errors: null,
    });
  }
}

export default AuthState;
