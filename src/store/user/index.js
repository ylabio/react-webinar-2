import StateModule from '../module';
import Cookies from 'js-cookie';

class UserState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: Cookies.get('token'),
      user: {},
      isAuth: null,
      waiting: false,
    };
  }

  async getUser() {
    this.setState({ ...this.getState(), waiting: true });

    if (this.getState().token) {
      const response = await fetch(
        `/api/v1/users/self?fields=_id,email,profile(phone, name)`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-Token': this.getState().token,
          },
        }
      );
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          user: json.result,
          isAuth: true,
          waiting: false,
        },
        'Пользователь успешно загружен по токену'
      );
    }
  }

  async login(data) {
    this.setState({ ...this.getState(), waiting: true });
    const response = await fetch(
      '/api/v1/users/sign?fields=_id,email,profile(phone,name)',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const json = await response.json();
    console.log({ json });

    if (json.error) {
      this.setState({...this.getState(), waiting: false})
      throw new Error(json.error.data.issues.map(item => item.message));
    }

    Cookies.set('token', json.result.token);

    this.setState(
      {
        ...this.getState(),
        token: json.result.token,
        user: json.result.user,
        isAuth: true,
        waiting: false,
      },
      'Login'
    );
  }

  async logout() {
    this.setState({ ...this.getState(), waiting: true });
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token,
      },
    });
    Cookies.remove('token', { path: '' });

    this.setState(
      {
        ...this.getState(),
        token: '',
        user: {},
        isAuth: false,
        waiting: false,
      },
      'Logout'
    );
  }
}

export default UserState;
