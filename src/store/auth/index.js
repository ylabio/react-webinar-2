import StateModule from '../module';

/**
 * Управление авторизацией
 */
class AuthState extends StateModule {
  initState() {
    return {
      name: null,
    };
  }

  async authentication(login, password) {
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        password: password,
        remember: true,
      }),
    });
    const json = await response.json();
    const result = json.result;

    if (result) {
      this.setState({
        ...this.getState(),
        token: result.token,
        user: result.user,
      });
      localStorage.setItem('Xtoken', this.getState().token);
      return true;
    } else {
      return false;
    }
  }

  async exit(token) {
    await fetch(`/api/v1/users/sign/`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'X-Token': token,
      },
    });
    localStorage.clear();
    this.setState({
      ...this.getState(),
      token: null,
      user: null,
    });
    return true;
  }
  async loadProfile() {
    const token = localStorage.getItem('Xtoken');
    if (!token) return;

    const response = await fetch('/api/v1/users/self', {
      method: 'GET',
      headers: {
        'X-Token': token,
      },
    });
    const json = await response.json();
    this.setState({
      ...this.getState(),
      user: json.result,
      token,
    });
  }
}

export default AuthState;
