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
      name: '',
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
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      this.setState({
        ...this.getState(),
        token: json.result.token,
        name: json.result.user.profile.name,
        isLogin: true,
        error: '',
      })
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: 'Некая ошибка от сервера',
      })
    }
  }

  /**
   * Получение данных о профиле по токену
   * @param token
   */
  async loadProfile(token) {
    // Установка признака загрузки
    this.setState({
      ...this.getState(),
      waiting: true
    })

    const response = await fetch(`/api/v1/users/self`, {
      method: 'GET',
      headers: { 'X-Token': token, "Content-Type": "application/json" }
    });
    const json = await response.json();
    console.log(json)
    this.setState({
      ...this.getState(),
      user: json.result,
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
      headers: { 'X-Token': token, "Content-Type": "application/json" }
    });
    const json = await response.json();
    this.setState({
      ...this.getState(),
      token: '',
      name: '',
      user: {},
      isLogin: false
    })
  }
}

export default AuthState;