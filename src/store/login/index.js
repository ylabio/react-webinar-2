import StateModule from "../module";

/**
 * Состояние статуса авторизации
 */
class LoginState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      status: null,
      user: null,
      error: null,
      token: null,
    };
  }

  async login(data = {}) {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });

      const json = await response.json();
        this.setState({
          status: 'auth',
          user: json.result.user,
          token: json.result.token,
          error: null,
        });
        localStorage.setItem("token", json.result.token); 
    } catch (err) {
      this.setState({
        status: 'no_auth',
        user: null,
        error: 'Неверный логин или пароль',
        token: null
      });
    }
  }

  async isAuth() {
    const response = await fetch(`/api/v1/users/self`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'X-Token': localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    if (response.status === 200) {
      this.setState({
        ...this.getState(),
        status: 'auth',
        user: json.result,
        token: localStorage.getItem("token"),
      });
    }
  }

  async logout() {
    const response = await fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: {
        "X-Token": this.getState().token,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      this.setState({
        ...this.getState(),
        status: null,
        user: null,
        error: null,
        token: null,
      });
      localStorage.removeItem("token");
    }
  }
}

export default LoginState;
