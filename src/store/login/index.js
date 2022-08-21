import StateModule from "../module";

/**
 * Состояние авторизации
 */
class LoginState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: null,
      auth: {
        login: '',
        password: '',
        isError: false,
        errorCode: null
      },
      isLoading: true,
      loadingError: false

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
      auth: {
        ...prevState.auth,
        login
      }
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
      auth: {
        ...prevState.auth,
        password
      }
    }, `Запись пароля в стейт`)
  }

  /**
   * Изменение в стейте состояния загрузки
   * @param bool {boolean}
   */
  #changeLoading(bool) {
    this.setState({
      ...this.getState(),
      isLoading: bool
    }, bool ? 'Начало загрузки' : 'Конец загрузки')
  }

  /**
   * Авторизация пользователя
   */
  async login() {
    this.setLoadingError(false);
    this.#changeLoading(true);

    const auth = this.getState().auth
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      body: JSON.stringify({login: auth.login, password: auth.password}),
      headers: {'Content-Type': 'application/json'}
    })
    const data = await response.json();

    if (data.error) {
      this.setState({
        ...this.getState(),
        auth: {
          ...this.getState().auth,
          isError: true,
          errorCode: data.error.code
        }
      }, 'Получена ошибка: ' + data.error.code)

      return
    }

    localStorage.setItem('TOKEN', data.result.token);

    this.setState({
      ...this.initState(),
      user: data.result.user
    }, 'Пользователь авторизован и данные о нем записаны в стейт');

    this.#changeLoading(false);
  }

  /**
   * Деавторизация пользователя
   */
  async logout() {
    const token = localStorage.getItem('TOKEN');
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {"X-Token": token}
    });

    localStorage.removeItem('TOKEN');

    this.setState({
      ...this.getState(),
      user: null
    }, 'Пользователь деавторизован и данные о нем удалены из стейта');
  }

  /**
   * Получение пользователя по токену
   */
  async getProfile() {
    const token = localStorage.getItem('TOKEN');

    this.#changeLoading(true);

    const response = await fetch('/api/v1/users/self', {
      headers: {"X-Token": token}
    })
    const data = await response.json();

    if (data.error) {
      this.setLoadingError(true);
      this.#changeLoading(false);

      return
    }

    this.setState({
      ...this.getState(),
      isLoading: false,
      user: data.result
    }, 'Пользователь получен по токену');

    this.#changeLoading(false);
  }

  /**
   * Сброс ошибки
   */
  resetError() {
    this.setState({
      ...this.getState(),
      auth: {
        ...this.getState().auth,
        isError: false,
        errorCode: null
      }
    }, 'Сброс ошибки')
  }

  /**
   * Изменение в стейте состояния ошибки
   * @param bool {boolean}
   */
  setLoadingError(bool) {
    this.setState({
      ...this.getState(),
      loadingError: bool
    }, bool ? 'Запись в стейт ошибки при загрузке' : 'Удаление из стейта ошибки при загрузке')
  }
}

export default LoginState;
