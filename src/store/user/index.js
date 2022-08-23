import StateModule from "../module";

/**
 * Состояние пользователя
 */
class UserState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {},
      token: window.localStorage.getItem("token") || null,
      waiting: false,
      error: null,
    };
  }

  async init() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const response = await fetch("/api/v1/users/self", {
      method: "GET",
      headers: {
        "X-Token": `${this.getState().token}`,
        "Content-type": "application/json",
      },
    });
    const json = await response.json();
    if (json.error) {
      window.localStorage.removeItem("token");
      this.setState(this.initState());
    } else {
      this.setState({
        ...this.getState(),
        waiting: false,
        data: json.result,
      });
    }
  }

  async onLogin(login, password) {
    if (login.length === 0 || password.length === 0) {
      this.setState({
        ...this.getState(),
        error: "Поля логин и пароль должны быть заполнены",
      });
      return;
    }
    this.setState({
      ...this.getState(),
      error: null,
      waiting: true,
    });
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
        }),
        headers: {
          "Content-type": "application/json",
        },
      });
      const json = await response.json();

      if (json.error) {
        this.setState({
          ...this.getState(),
          error: json.error.data.issues[0].message,
          waiting: false,
        });
      } else {
        this.setState({
          ...this.getState(),
          data: json.result.user,
          token: json.result.token,
          error: null,
          waiting: false,
        });
        window.localStorage.setItem("token", json.result.token);
      }
    } catch (e) {
      console.log(e);
      this.setState({
        ...this.getState(),
        error: "Ошибка выполнения запроса",
        waiting: false,
      });
    }
  }

  async onLogout() {
    localStorage.removeItem("token");
    this.setState(this.initState());
    await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        "X-Token": `${this.getState().token}`,
        "Content-type": "application/json",
      },
    });
  }
}

export default UserState;
