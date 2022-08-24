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
      isLoggedIn: false,
      error: null,
      waiting: false,
      name: '',
      user: {}
    };
  }

  /**
   * Загрузка
   */
  async login(login, password) {
    // установка признака ожидания загрузки
    this.setState({
      waiting: true,
      error: ''
    });
    try {
      const response = await fetch(`/api/v1/users/sign?fields=profile(name)`, {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({login, password})
      })
      const json = await response.json();
      if (json.error) {
        this.setState({
          ...this.getState(),
          waiting: false,
          error: json.error.data.issues[0].message
        });
      } else {
        localStorage.setItem("token", json.result.token)
        // авторизация успешно
        this.setState({
          ...this.getState(),
          isLoggedIn: true,
          waiting: false,
        });
        await this.isAuth()
      }
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

  resetError() {
    if (this.getState().error) {
      this.setState({
        ...this.getState(),
        error: '',
      });
    }
  }

  async logout() {
    this.setState({
      waiting: true,
    });
    const token = localStorage.getItem("token")
    try {
      const response = await fetch('api/v1/users/sign', {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': `${token}`
        },
        method: 'DELETE'
      })

      localStorage.removeItem('token');
      this.setState({
        ...this.getState(),
        isLoggedIn: false,
        waiting: false,
      });
    } catch (e) {
      this.setState({
        waiting: false
      });
    }
  }

  async isAuth() {
    const token = localStorage.getItem("token")
    this.setState({
      waiting: true,
      error: ''
    });
    try {
      const response = await fetch("/api/v1/users/self", {
        method: "GET",
        headers: {
          "X-Token": `${token}`
        }
      })
      const json = await response.json()
      this.setState({
        ...this.getState(),
        isLoggedIn: true,
        waiting: false,
        name: json.result.profile.name,
        user: json.result,
      });

    } catch (e) {
      this.setState({
        waiting: false
      });
    }
  }
}


export default LoginState;
