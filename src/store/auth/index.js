import StateModule from '../module';

/**
 * Состояние товара
 */
class AuthState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      error: '',
      isAuth: false,
    };
  }

  /**
   * Авторизация
   * @param {object} data логин и пароль
   * @param {string} data.login логин
   * @param {string} data.password пароль
   */
  async login(data) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();

      // проверка на 400 ошибку, она в catch не попадает
      if (json.hasOwnProperty('error')) {
        this.setState({
          ...this.getState(),
          waiting: false,
          error: `${json.error.message}: ${json.error.data.issues[0].message}`,
        });
        return;
      }

      localStorage.setItem('token', json.result.token);
      const userData = {
        _id: json.result.user._id,
        name: json.result.user.profile.name,
        phone: json.result.user.profile.phone,
        email: json.result.user.email,
      };

      this.store.get('profile').setAuthProfile(userData);
      this.setState({
        ...this.getState(),
        waiting: false,
        isAuth: true,
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
        waiting: false,
      });
    }
  }

  /**
   * Выход из аккаунта
   */
  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-Token': localStorage.getItem('token'),
        },
      });

      localStorage.removeItem('token');
      this.setState({
        ...this.getState(),
        waiting: false,
        isAuth: false,
      });
    } catch (error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: error.message,
      });
    }
  }

  async isAuth() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/self`, {
        headers: {
          'X-Token': localStorage.getItem('token'),
        },
      });

      if (response.ok) {
        this.setState({
          ...this.getState(),
          isAuth: true,
        });

        return await response.json();
      } else {
        console.log('Не удалось авторизироваться');
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: error.message,
      });
    } finally {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

  /**
   * Убираем ошибку от сервера
   */
  clearError() {
    this.setState({
      ...this.getState(),
      error: '',
    });
  }
}

export default AuthState;
