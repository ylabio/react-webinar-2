import StateModule from "../module";

/**
 * Состояние
 */
class LoginState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      isLogged: false,
      error: null,
      isLoading: false,
      name: "",
      user: {},
    };
  }

  /**
   * Загрузка
   */
  async login(login, password) {
    // установка признака ожидания загрузки
    this.setState({
      isLoading: true,
      error: "",
    });
    try {
      const response = await fetch(`/api/v1/users/sign?fields=profile(name)`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });
      const json = await response.json();
      if (json.error) {
        this.setState({
          ...this.getState(),
          isLoading: false,
          error: "Логин либо пароль не верны",
        });
      } else {
        localStorage.setItem("token", json.result.token);
        // авторизация успешно
        this.setState({
          ...this.getState(),
          isLogged: true,
          isLoading: false,
        });
        await this.isAuth();
      }
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        ...this.getState(),
        isLoading: false,
      });
    }
  }

  clearError() {
    this.setState({
      ...this.getState(),
      error: "",
    });
  }

  async logout() {
    this.setState({
      isLoading: true,
    });
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("api/v1/users/sign", {
        headers: {
          "Content-Type": "application/json",
          "X-Token": `${token}`,
        },
        method: "DELETE",
      });

      localStorage.removeItem("token");
      this.setState({
        ...this.getState(),
        isLogged: false,
        isLoading: false,
      });
    } catch (e) {
      this.setState({
        isLoading: false,
      });
    }
  }

  async isAuth() {
    const token = localStorage.getItem("token");
    this.setState({
      isLoading: true,
      error: "",
    });
    try {
      const response = await fetch("/api/v1/users/self", {
        method: "GET",
        headers: {
          "X-Token": `${token}`,
        },
      });
      const json = await response.json();
      this.setState({
        ...this.getState(),
        isLogged: true,
        isLoading: false,
        name: json.result.profile.name,
        user: json.result,
      });
    } catch (e) {
      this.setState({
        isLoading: false,
      });
    }
  }
}

export default LoginState;
