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
      ...this.state,
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
      console.log(json);

      if (json.error) {
        this.setState({
          ...this.state,
          errors: json.error.data?.issues,
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
}

export default AuthState;
