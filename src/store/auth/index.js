import StateModule from '../module';
import Cookies from 'js-cookie';

class AuthModule extends StateModule {
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

    this.setState({
      ...this.getState(),
      user: json.result,
      isAuth: true,
      waiting: false,
    });
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

export default AuthModule;
