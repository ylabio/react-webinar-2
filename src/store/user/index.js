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
      isLogged: false,
      data: {},
      error: '',
      waiting: false
    };
  }

  /**
   * Авторизация
   * @param login {string}
   * @param password {string}
   * @returns {Promise<void>}
   */
  async login(login, password) {
    // Установка признака загрузки и сброс ошибки
    this.setState({
      ...this.getState(),
      waiting: true,
      error: ''
    });

    let response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password })
    });
    let json = await response.json();

    if (response.ok) {
      // Установка полученных данных и признака авторизации, сброс признака загрузки
      this.setState({
        ...this.getState(),
        isLogged: true,
        data: json.result.user,
        waiting: false
      });
      localStorage.setItem('token', json.result.token);

    } else {
      // Установка ошибки и сброс признака загрузки
      this.setState({
        ...this.getState(),
        error: 'Error: ' + json.error.data.issues[0].message,
        waiting: false
      });
    }
  }

  /**
   * Сброс авторизации
   * @returns {Promise<void>}
   */
  async logout() {
    const token = localStorage.getItem('token');
    let response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      }
    });

    if (response.ok) {
      localStorage.removeItem('token');
      // Сброс данных пользователя, признака авторизации
      this.setState({
        ...this.getState(),
        isLogged: false,
        data: {}
      });
    }
  }

  /**
   * Сброс ошибки
   */
  clearError() {
    this.setState({
      ...this.getState(),
      error: ''
    });
  }

  /**
   * Проверка авторизации
   * @returns {Promise<void>}
   */
  async checkAuth() {
    // Установка признака загрузки
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const token = localStorage.getItem('token');

    if (!token) {
      this.setState({
        ...this.getState(),
        waiting: false
      });
      return;
    }

    let response = await fetch('/api/v1/users/self', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      }
    });

    if (response.ok) {
      let json = await response.json();
      // Установка полученных данных и признака авторизации, сброс признака загрузки
      this.setState({
        ...this.getState(),
        isLogged: true,
        data: json.result,
        waiting: false
      });

    } else {
      localStorage.removeItem('token');
      // Сброс признака загрузки
      this.setState({
        ...this.getState(),
        waiting: false
      });
    }
  }
}

export default UserState;
