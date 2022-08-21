import StateModule from "../module";
import {saveToken, getToken, dropToken} from "../token";

/**
 * Состояние статуса авторизации
 */
class LoginState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      status: 'unknown',
      user: null,
      error: null,
    };
  }

  /**
   * Авторизация пользователя
   */
  async login(data = {}) {
    // Сброс текущего пользователя
    this.setState({
      ...this.getState(),
      status: 'unknown',
      user: null,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });

      const json = await response.json();

      if (response.status === 200) {
        // Авторизация прошла успешно
        this.setState({
          ...this.getState(),
          status: 'auth',
          user: json.result.user,
          error: null,
        });

        saveToken(json.result.token);
      } else {
        // При авторизации произошла ошибка
        const errorMessage = json.error.data.issues[0].message;
        throw new Error(errorMessage);
      }
    } catch (err) {
      // Сохраняем данные об ошибке в стейт
      this.setState({
        status: 'no_auth',
        user: null,
        error: err.message,
      });
    }
  }

  /**
   * Проверка авторизации
   */
  async checkAuth() {
    // Сброс текущего пользователя
    this.setState({
      status: 'unknown',
      user: null,
      error: null,
    });

    const token = getToken();

    const response = await fetch(`/api/v1/users/self`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${token}`
      }
    });

    const json = await response.json();
    
    if (response.status === 200) {
      // Авторизация прошла успешно
      this.setState({
        ...this.getState(),
        status: 'auth',
        user: json.result,
      });
    } else {
      // Не получилось авторизоваться
      this.setState({
        ...this.getState(),
        status: 'no_auth',
        user: json.result,
      });
    }
  }

  /**
   * Сброс авторизации
   */
  logout() {
    this.setState({
      ...this.getState(),
      status: 'no_auth',
      user: null,
    });

    dropToken();
  }

}

export default LoginState;
