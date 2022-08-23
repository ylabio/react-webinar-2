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
      if (window.history.length > 2) {
        window.history.back();
      }
    }
    if (json.error) {
      this.setState({
        ...this.getState(),
        error: json.error?.data?.issues[0]?.message,
        waiting: false,
      });
      console.log(this.getState().error);
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
        user: {},
        error: '',
        token: '',
        waiting: false,
        loggedIn: false,
      });
    }
  }

  async checkToken(token) {
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
        user: json.result,
        error: '',
        token: token,
        waiting: false,
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
