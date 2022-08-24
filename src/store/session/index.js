import StateModule from '../module';

/**
 * Состояние товара
 */
class SessionState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */

  initState() {
    return {
      isLogged: false,
      name: '',
      error: '',
    };
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: '',
    });
  }

  // проверка доступа
  async checkAccess(token) {
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      if (response.status === 403) {
        throw new Error('Что-то не так с доступом!');
      }

      const json = await response.json();
      const result = json.result;

      this.setState({
        name: result.profile.name,
        isLogged: true,
      });
    } catch (error) {
      console.log(error.message);
      localStorage.removeItem('token');
      this.setState({
        ...this.initState(),
      });
    }
  }

  // отмена авторизации
  async onLogout(token) {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
      if (response.status === 403) {
        throw new Error('Что-то пошло не так при выходе!');
      }

      this.setState({
        ...this.initState(),
        isLogged: false,
      });
    } catch (error) {
      console.log(error.message);

      this.setState({
        ...this.initState(),
        isLogged: false,
      });
    }
  }

  // авторизация
  async onLogin(login, password) {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });
      const json = await response.json();
      if (response.status === 400) {
        console.log(json.error);
        throw new Error(json.error.data.issues.map((i) => i.message));
      }
      // history.back();

      const user = await json.result.user;

      localStorage.setItem('token', json.result.token);

      this.setState({
        ...this.getState(),
        name: user.profile.name,
        isLogged: true,
        error: '',
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
      });
    }
  }
}

export default SessionState;