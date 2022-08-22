import Api from "../../API";
import StateModule from "../module";

/**
 * Состояние товара
 */
class LoginState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: "",
      isAuth: false,
      isLoading: false,
      error: "",
    };
  }

  async auth(login, password) {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });

    try {
      const response = await Api.auth(login, password);

      localStorage.setItem("token", response.data.result.token);
      this.setState({
        user: response.data.result.user,
        token: response.data.result.token,
        isAuth: true,
        isLoading: false,
        error: "",
      });
    } catch (error) {
      this.setState({
        user: {},
        token: "",
        isAuth: false,
        isLoading: false,
        error: error.response.data.error.message,
      });
    }
  }

  async logout() {
    this.setState({
      ...this.getState(),
      isLoading: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Token": `${this.getState().token}`,
        },
      });
      const json = await response.json();

      if (json.result) {
        localStorage.removeItem("token");
        this.setState({
          user: {},
          token: "",
          isLoading: false,
          error: "",
        });
      }
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e,
        isLoading: false,
      });
    }
  }

  async authCheck() {
    this.setState({
      ...this.getState(),
      token: localStorage.getItem("token"),
      // isAuth: !!localStorage.getItem("token"),
      // тут ошибка, ищу решение (редирект на логин)
      error: "",
      isLoading: true,
    });

    if (!this.getState().token) {
      this.setState({
        ...this.getState(),
        isLoading: false,
      });
    } else {
      const response = await fetch(`/api/v1/users/self`, {
        headers: {
          "Content-Type": "application/json",
          "X-Token": `${this.getState().token}`,
        },
      });
      const json = await response.json();

      this.setState({
        ...this.getState(),
        isAuth: true,
        user: json.result,
        error: "",
        isLoading: false,
      });
    }
  }
}

export default LoginState;
