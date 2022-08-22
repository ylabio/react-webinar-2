import StateModule from '../module';

/**
 * Состояние товара
 */
class ProfileState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */

  initState() {
    return {
      user: {},
      isLogged: false,
      waiting: false,
      error: '',
    };
  }

  // авторизация пользователя
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

      if (response.status === 400) {
        throw new Error('Неверный логин или пароль');
      }
      history.back();
      const json = await response.json();
      const user = await json.result.user;

      localStorage.setItem('token', json.result.token);

      this.setState({
        ...this.getState(),
        user: { name: user.profile.name },
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

  // проверка на авторизацию пользователя
  async checkUser(token, type = 'check') {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      if (response.status === 403) {
        throw new Error('Что-то не так с авторизацией!');
      }

      const json = await response.json();
      const result = json.result;

      if (type === 'load') {
        this.setState({
          ...this.getState(),
          user: {
            email: result.email,
            phone: result.profile.phone,
            name: result.profile.name,
          },
          isLogged: true,
          waiting: false,
        });
      }
      if (type === 'check') {
        this.setState({
          ...this.getState(),
          user: {
            name: result.profile.name,
          },
          isLogged: true,
          waiting: false,
        });
      }
    } catch (error) {
      console.log(error.message);
      localStorage.removeItem('token');
      this.setState({
        ...this.getState(),
        user: {},
        isLogged: false,
        waiting: false,
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
}

export default ProfileState;
