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
      directTo: null,
    };
  }

  resetRedirect() {
    this.setState({
      ...this.getState(),
      directTo: null,
    });
  }

  resetState() {
    console.log('reseted');
    this.setState({ ...this.initState() });
    localStorage.clear();
  }

  initUser(user) {
    if (user) {
      this.setState({
        ...this.getState(),
        user: { ...user },
        isLogged: true,
      });
    } else {
      this.setState({
        ...this.getState(),
        isLogged: false,
      });
    }
  }

  // авторизация пользователя
  async onLogin(login, password) {
    const logAndPas = {
      login: login,
      password: password,
    };

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logAndPas),
      });

      if (response.status === 400) {
        throw new Error('Неверный логин или пароль');
      }

      const json = await response.json();
      const user = await json.result.user;
      localStorage.setItem(
        'user',
        JSON.stringify({
          email: user.email,
          phone: user.profile.phone,
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
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
      if (response.status === 403) {
        throw new Error('Wrong token');
      }
      console.log('checked from store');
      this.setState({
        ...this.getState(),
        directTo: 'profile',
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        directTo: 'login',
      });
    }
  }

  // отмена авторизации
  async onLogout(token) {
    console.log('from logout');
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });
      localStorage.clear();
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
