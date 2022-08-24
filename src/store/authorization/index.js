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
      this.store.get('profile').getUser(json.result.user);
      this.setState({
        ...this.getState(),
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
      this.store.get('profile').getUser();
      this.setState({
        ...this.getState(),
        error: json.error?.data?.issues[0]?.message,
        waiting: false,
      });
    }
    console.log(json);
  }

  async logout(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
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
        waiting: false,
        loggedIn: false,
      });
    }
  }

  async checkToken(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
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
      this.store.get('profile').getUser(json.result);
      this.setState({
        ...this.getState(),
        token: token,
        waiting: false,
        loggedIn: true,
      });
    }
    if (json.error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        loggedIn: false,
      });
    }
  }

  cleanError() {
    this.setState({
      ...this.getState(),
      error: '',
    });
  }
}

export default Authorization;
