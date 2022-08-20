import StateModule from "../module";

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
      const response = await fetch(`/api/v1/users/sign`, {method: 'POST', body: JSON.stringify(data), headers: {'Content-Type': 'application/json'}});
      const json = await response.json();

      // Авторизация прошла успешно
      this.setState({
        status: 'auth',
        user: json,
      });
    } catch (e){
      // Ошибка при авторизации
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        status: 'no_auth',
        user: undefined,
      });
    }
  }
}

export default LoginState;
