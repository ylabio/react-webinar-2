import StateModule from "../module";

/**
 * Состояние авторизации
 */
class AuthState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: '',
      error: '',
      user: {},
      isLogin: false,
      waiting: false
    };
  }

  /**
  * Авторизация по логину и паролю
  * @param login
  * @param password
  */
  async login(login, password) {
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'POST',
      body: JSON.stringify({ login: login, password: password }),
      headers: { "Content-Type": "application/json" }
    });
    const json = await response.json();
    if (json.error) {
      this.setState({
        ...this.getState(),
        error: `${json.error.data.issues[0].message}`,
      })
    } else {
      this.setState({
        ...this.getState(),
        token: json.result.token,
        isLogin: true,
        user: json.result.user,
        error: '',
      })
      localStorage.setItem("token", json.result.token);
      localStorage.setItem("userName", json.result.user.profile.name);
    }
  }

  /**
   * Получение данных о профиле по токену
   * @param token
   */
  async loadProfile() {
    // Установка признака загрузки
    const token = localStorage.getItem("token");
    this.setState({
      ...this.getState(),
      waiting: true
    })

    const response = await fetch(`/api/v1/users/self`, {
      method: 'GET',
      headers: { 'X-Token': token, "Content-Type": "application/json" }
    });
    const json = await response.json();
    this.setState({
      ...this.getState(),
      token: token,
      user: json.result,
      isLogin: true,
      waiting: false
    })
  }

  /**
  * Удаление данных о профиле по токену
  * @param token
  */
  async logout(token) {
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: { 'X-Token': token, 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    this.setState({
      ...this.getState(),
      token: '',
      name: '',
      user: {},
      isLogin: false
    })
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

  }
}

export default AuthState;