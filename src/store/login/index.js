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
        }, 'store/login [login] авторизация успешно');

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
      }, 'store/login [login] авторизация не удалась');
    }
  }

  /**
   * Проверка авторизации
   */
  async checkAuth() {
    const token = getToken();

    if (!token) {
      // Нет токена - не делаем запрос. устанавливаем статус 'no_auth'
      this.setState({
        ...this.getState(),
        status: 'no_auth',
        user: null,
      }, 'store/login [checkAuth] no_auth. нет токена');

    } else if (this.getState().status !== 'auth') {
      // Есть токен и стаутус равен 'no_auth' или 'unknown' - делаем запрос
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
        }, 'store/login [checkAuth] успешно');
      } else {
        // Не получилось авторизоваться
        this.setState({
          ...this.getState(),
          status: 'no_auth',
          user: json.result,
        }, 'store/login [checkAuth] не удалось, ошибка запроса');
      }
    }
  }

  /**
   * Сброс авторизации
   */
  async logout() {
    this.setState({
      ...this.getState(),
      status: 'no_auth',
      user: null,
    }, 'store/login [logout]');

    const token = getToken();

    await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${token}`
      }
    });

    dropToken();
  }

}

export default LoginState;
