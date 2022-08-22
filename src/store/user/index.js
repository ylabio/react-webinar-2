import StateModule from '../module';

/**
 * Состояние пользователя
 */
class UserState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: localStorage.getItem('authToken') || null,
      loading: false,
      error: '',
    };
  }

  /**
   * Логин в аккаунт
   * @param login {string}
   * @param password {string}
   * @returns {Promise<void>}
   */
  async login(login, password) {
    this.setState({
      ...this.getState(),
      loading: true,
    });

    // Попробовать так /api/v1/users/sign
    const response = await fetch(
      `api/v1/users/sign?fields=_id,email,profile(name,phone)`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password,
          remember: true,
        }),
      }
    );
    const json = await response.json();

    if (response.ok) {
      localStorage.setItem('authToken', json.result.token);
      this.setState({
        ...this.getState(),
        user: json.result.user,
        token: json.result.token,
        loading: false,
      });
    } else {
      this.setState({
        ...this.getState(),
        error: json.error.message,
        loading: false,
      });
    }
  }

  /**
   * Выход из аккаунта
   * @returns {Promise<void>}
   */
  async logout() {
    this.setState({
      ...this.getState(),
      loading: true,
    });

    const response = await fetch(`api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token,
      },
    });

    const json = response.json();

    if (response.ok) {
      this.setState({
        ...this.getState(),
        user: {},
        token: null,
        loading: false,
      });
      localStorage.removeItem('authToken');
    } else {
      this.setState({
        ...this.getState(),
        error: json.error.message,
        loading: false,
      });
    }
  }

  /**
   * Проверка авторизации
   * @returns {Promise<void>}
   */
  async checkAuth() {
    this.setState({
      ...this.getState(),
      loading: true,
    });

    if (!this.getState().token) {
      this.setState({
        ...this.getState(),
        loading: false,
      });
      return;
    }

    const response = await fetch(`api/v1/users/self`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token,
      },
    });
    const json = await response.json();

    if (response.ok) {
      this.setState({
        ...this.getState(),
        user: json.result,
        loading: false,
      });
    } else {
      this.setState({
        ...this.getState(),
        loading: false,
        error: new Error(response.statusText),
      });
    }
  }
}

export default UserState;
