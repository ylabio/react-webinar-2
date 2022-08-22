import StateModule from '../module';

/**
 * Авторизация
 */
class Authorization extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      error: '',
      token: '',
      waiting: false,
      loggedIn: false,
    };
  }

  async login(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ login, password }),
    });
    const json = await response.json();
    if (json.result) {
      this.setState({
        user: json.result.user,
        error: '',
        token: json.result.token,
        waiting: false,
        loggedIn: true,
      });
      localStorage.setItem('token', this.getState().token);
    }
    if (json.error) {
      this.setState({
        ...this.getState(),
        user: {},
        error: json.error?.data?.issues[0]?.message,
        token: '',
        waiting: false,
      });
    }
  }

  async logout(token) {
    const response = await fetch(`/api/v1/users/sign/`, {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (json.result) {
      this.setState({
        ...this.getState(),
        user: {},
        error: '',
        token: '',
        loggedIn: false,
      });
    }
  }

  async checkToken(token) {
    this.setState({
      ...this.getState(),
    });
    const response = await fetch(`/api/v1/users/self/`, {
      method: 'GET',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json',
      },
    });
    const json = await response.json();
    if (json.result) {
      this.setState({
        ...this.getState(),
        user: json.result,
        error: '',
        token: token,
        loggedIn: true,
      });
    }
    if (json.error) {
      this.setState({
        ...this.getState(),
        user: {},
        loggedIn: false,
      });
    }
  }
}

export default Authorization;
