import getStorage from "../../utils/getStorage";
import setStorage from "../../utils/setStorage";
import removeStorage from "../../utils/removeStorage";
import StateModule from "../module";

/**
 * Состояние пользователя
 */
class User extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: getStorage("user"),
      waiting: false,
      error: null,
    };
  }

  /**
   * Загрузка пользователя
   */
  async login(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const response = await fetch("api/v1/users/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    });

    const json = await response.json();

    if (json?.result?.user) {
      this.setState({
        ...this.getState(),
        user: json.result.user,
        error: null,
        waiting: false,
      });

      setStorage("token", json.result.token);
      setStorage("user", JSON.stringify(json.result.user));

      return;
    }

    if (json?.error) {
      this.setState({
        ...this.getState(),
        error: {
          code: json.error.code,
          message: json.error.message,
        },
        waiting: false,
      });
    }
  }

  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    await fetch("api/v1/users/sign", {
      method: "DELETE",
      headers: {
        "X-Token": getStorage("token"),
        "Content-Type": "application/json",
      },
    });

    this.setState({
      ...this.getState(),
      user: null,
      waiting: false,
    });

    removeStorage("token");
    removeStorage("user");
  }
}

export default User;
