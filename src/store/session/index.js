import StateModule from "../module";

/**
 * Состояние сессии
 */
class SessionState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: '',
      name: '',
      error: '',
      isLogged: false,
      waiting: false
    };
  }

  /**
  * Проверка токена выборкой профиля
  * @param token
  */
  async loadSession(token) {
    // Сброс текущего состояния и установка признака загрузки
    this.setState({
      token: '',
      name: '',
      error: '',
      isLogged: false,
      waiting: true
    })
    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: { 'X-Token': token, 'Content-Type': 'application/json' }
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(`${json.error.data.issues[0].message}`)
      }
      this.setState({
        ...this.getState(),
        token: token,
        name: json.result.profile.name,
        isLogged: true,
        waiting: false
      })
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
        waiting: false
      })
    }
  }


  /**
  * Авторизация по логину и паролю
  * @param login
  * @param password
  */
  async login(login, password) {
    // Сброс текущего состояния и установка признака загрузки
    this.setState({
      token: '',
      name: '',
      error: '',
      isLogged: false,
      waiting: true
    })
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(`${json.error.data.issues[0].message}`)
      }

      this.setState({
        token: json.result.token,
        name: json.result.user.profile.name,
        error: '',
        isLogged: true,
        waiting: false
      })

      localStorage.setItem("token", json.result.token);

    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
        waiting: false
      })
    }
  }

  /**
  * Выход из профиля
  * @param token
  */
  async logout(token) {
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: { 'X-Token': token, 'Content-Type': 'application/json' }
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(`${json.error.data.issues[0].message}`)
      }

      this.setState({
        token: '',
        name: '',
        error: '',
        isLogged: false,
        waiting: true
      })

      localStorage.removeItem("token");
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
        isLogged: true,
        waiting: true
      })
    } finally {
      this.setState({
        ...this.getState(),
        waiting: false
      })
    }
  }
}

export default SessionState;