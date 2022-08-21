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
      loginData: {},
      profileData: {},
      waiting: false,
      logErr: false,
      loggedIn: false
    };
  }

  /**
   * Загрузка профиля пользователя по токену
   */
  async loadProfile() {
    const token = localStorage.getItem("token");

    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
      loggedIn: false,
    });

    try {
      const response = await fetch(`/api/v1/users/self`, {
        headers: {
          "Content-type": "application/json",
          "X-Token": token
        }
      });
      const json = await response.json();
      // Данные загружены успешно
      this.setState({
        ...this.getState(),
        profileData: json.result,
        waiting: false,
        loggedIn: true,
      }, "удачная загрузка данных пользователя по токену");
    } catch (e) {
      // Ошибка
      this.setState({
        ...this.getState(),
        waiting: false,
        logErr: true,
      }, "неудачная загрузка данных пользователя по токену");
    }
  }

  /**
   * Загрузка пользователя по токену
   */
  async loginByToken() {
    const token = localStorage.getItem("token");

    if (!this.getState().loggedIn && token) {
      // Установка признака ожидания загрузки
      this.setState({
        ...this.getState(),
        waiting: true,
        loggedIn: false,
      });

      try {
        const response = await fetch(`/api/v1/users/self?fields=profile(name)`, {
          headers: {
            "Content-type": "application/json",
            "X-Token": token
          }
        });
        const json = await response.json();
        // Данные загружены успешно
        this.setState({
          ...this.getState(),
          loginData: json.result.profile,
          waiting: false,
          loggedIn: true,
        });
      } catch (e) {
        // Ошибка при логине
        this.setState({
          ...this.getState(),
          waiting: false,
          loggedIn: false
        });
      }
    }
  }

  /**
   * Загрузка пользователя по логину и паролю
   * @param login {String}
   * @param password {String}
   */
  async login({ login, password }) {
    // Сброс текущих данных пользователя и установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
      loginData: {},
      error: false,
    });

    try {
      const response = await fetch(`/api/v1/users/sign?fields=profile(name)`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
          login,
          password
        })

      });
      const json = await response.json();
      localStorage.setItem("token", json.result.token)

      // Данные загружены успешно
      this.setState({
        ...this.getState(),
        loginData: json.result.user.profile,
        waiting: false,
        logErr: false,
        loggedIn: true
      }, "загрузка данных по логину и паролю");
    } catch (e) {
      // Ошибка при логине
      this.setState({
        loginData: {},
        profileData: {},
        waiting: false,
        logErr: true,
        loggedIn: false
      }, "ошибка загрузки данных по логину и паролю");
    }
  }

  /**
   * Разлогинивание пользователя
   */
  async signOut() {
    const token = localStorage.getItem("token");

    try {
      await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          "Content-type": "application/json",
          "X-Token": token
        }
      });

      //обнуление данных пользователя
      localStorage.removeItem("token");
      this.setState({
        loginData: {},
        profileData: {},
        waiting: false,
        logErr: false,
        loggedIn: false
      }, "signOut");
    } catch (e) {
      console.log("server notification error: ", e)
      //обнуление данных пользователя
      localStorage.removeItem("token");
      this.setState({
        loginData: {},
        profileData: {},
        waiting: false,
        logErr: false,
        loggedIn: false
      }, "signOut");
    }

  }
}

export default AuthState;
