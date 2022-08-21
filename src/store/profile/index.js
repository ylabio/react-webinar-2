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

  initUser(user) {
    console.log('ИНИЦИАЛИЗАЦИЯ');
    if (user) {
      this.setState({
        ...this.getState(),
        isLogged: true,
      });
    }
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
      localStorage.setItem(
        'user',
        JSON.stringify({
          name: user.profile.name,
        })
      );

      this.setState({
        ...this.getState(),
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
  async checkUser(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // 'X-Token': 111,
          'X-Token': token,
        },
      });
      if (response.status === 403) {
        throw new Error('Wrong token');
      }
      const json = await response.json();
      const result = json.result;

      this.setState({
        ...this.getState(),
        user: {
          email: result.email,
          phone: result.profile.phone,
          name: result.profile.name,
        },
        waiting: false,
      });
    } catch (error) {
      localStorage.removeItem('user');
      this.setState({
        ...this.getState(),
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
      localStorage.removeItem('user');
      this.setState({
        ...this.initState(),
        isLogged: false,
      });

      if (response.status === 400) {
        throw new Error('bad reques');
      }
    } catch (error) {
      console.log(error.message);
    }
  }
}

export default ProfileState;
