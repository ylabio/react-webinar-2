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
      status: 'no_auth',
      user: undefined,
    };
  }
  /**
   * Авторизация пользователя
   */
  async login(data = {}) {
    // Сброс текущего пользователя
    this.setState({
      status: 'unknown',
      user: undefined,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });
      const json = await response.json();

      // Авторизация прошла успешно
      this.setState({
        status: 'auth',
        user: json.result.user,
      });

      saveToken(json.result.token);

    } catch (e){
      // Ошибка при авторизации
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        status: 'no_auth',
        user: undefined,
      });
    }
  }

  /**
   * Сброс авторизации
   */
  logout() {
    this.setState({
      status: 'no_auth',
      user: undefined,
    });

    dropToken();
  }

  /**
   * Проверка авторизации
   */
  async checkAuth() {
    const token = getToken();
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': `${token}`
        }
      });
      const {result} = await response.json();

      if (!result) {
        throw new Error();
      }

      // Авторизация прошла успешно
      this.setState({
        status: 'auth',
        user: result,
      });

    } catch(e) {
      // Авторизация по токену была отклонена (возможно нет токена)
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        status: 'no_auth',
        user: undefined,
      });
    }
  }

}

export default LoginState;