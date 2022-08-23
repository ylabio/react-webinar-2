import StateModule from "../module";

/**
 * Состояние формы авторизации
 */
class LoginState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      login: '',
      password: '',
      isError: false,
      errorCode: null
    };
  }

  /**
   * Запись логина в стейт
   * @param login {string}
   */
  setLogin(login) {
    const prevState = this.getState();
    this.setState({
      ...prevState,
      login
    }, `Запись логина в стейт`)
  }

  /**
   * Запись пароля в стейт
   * @param password {string}
   */
  setPassword(password) {
    const prevState = this.getState();
    this.setState({
      ...prevState,
      password
    }, `Запись пароля в стейт`)
  }

  /**
   * Запрос на авторизацию пользователя
   */
  async login() {
    this.store.get('session').setLoadingError(false);
    this.store.get('session').changeLoading(true);

    const auth = this.getState();
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      body: JSON.stringify({login: auth.login, password: auth.password}),
      headers: {'Content-Type': 'application/json'}
    })
    const data = await response.json();

    if (data.error) {
      this.setState({
        ...this.getState(),
        isError: true,
        errorCode: data.error.code
      }, 'Получена ошибка: ' + data.error.code)

      return
    }

    localStorage.setItem('TOKEN', data.result.token);

    this.store.get('session').setUser(data.result.user);

    this.store.get('session').changeLoading(false);
  }

  /**
   * Сброс ошибки
   */
  resetError() {
    this.setState({
      ...this.getState(),
      isError: false,
      errorCode: null
    }, 'Сброс ошибки')
  }
}

export default LoginState;
