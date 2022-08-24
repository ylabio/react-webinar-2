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
      userName: "",
      error: "",
      isAuth: false,
      waiting: false,
      firstRender: true,
    };
  }

  /**
   * Авторизация
   */
  async login(payload) {
    // Установка признака загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const json = await response.json();

      if (json.error) {
        this.setState({
          ...this.getState(),
          error: `${
            json.error.data.issues[0].message
              ? json.error.data.issues[0].message
              : "Некая ошибка от сервера"
          }`,
          waiting: false,
        });
        setTimeout(() => {
          this.setState({
            ...this.getState(),
            error: "",
          });
        }, 3000);
      } else {
        await localStorage.setItem("token", json?.result?.token);

        // Пользователь авторизован
        this.setState({
          userName: json?.result?.user?.profile?.name,
          error: "",
          isAuth: true,
          waiting: false,
        });
      }
    } catch (error) {
      // Иная ошибка
      this.setState({
        ...this.getState(),
        error: `${error}`,
        waiting: false,
      });
    }
  }

  /**
   * Выход
   */
  async logout() {
    // Установка признака загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const token = await localStorage.getItem("token");

    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });

      if (response.status == 200) {
        await localStorage.removeItem("token");

        // Пользователь разлогинен
        this.setState({
          error: "",
          isAuth: false,
          userName: "",
          waiting: false,
        });
      }
    } catch (e) {
      this.setState({
        error: "",
        isAuth: false,
        userName: "",
        waiting: false,
      });
    }
  }

  /**
   * Получить данные профиля
   */
  async me() {
    // Установка признака загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const token = await localStorage.getItem("token");

    try {
      const response = await fetch("/api/v1/users/self", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Token": token,
        },
      });
      const json = await response.json();

      this.setState({
        ...this.getState(),
        userName: json.result.profile.name,
        isAuth: true,
        waiting: false,
        firstRender: false,
      });
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        isAuth: false,
        waiting: false,
        firstRender: false,
      });
    }
  }

  resetState() {
    // Сброс стейта до initState
    this.setState({
      userName: "",
      error: "",
      isAuth: false,
      waiting: false,
      firstRender: true,
    });
  }
}

export default AuthState;
