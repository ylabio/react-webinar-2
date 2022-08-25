import StateModule from "../module";

class AuthState extends StateModule {

  initState() {
    return {
      waiting: true,
      isAuth: false,
      token: localStorage.getItem('auth-token') || '',
      user: {},
      error: {}
    };
  };

  async checkToken() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const token = localStorage.getItem('auth-token');
    if (!token) {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
      return
    }

    const response = await fetch(`/api/v1/users/self`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${token}`,
      }
    });
    const json = await response.json();

    if (response.ok) {
      this.setState({
        ...this.getState(),
        isAuth: true,
        user: json.result.profile,
        waiting: false,
        error: '',
      });
    } else {
      this.setState({
        ...this.getState(),
        isAuth: false,
        user: {},
        waiting: false,
        error: json.error,
      });
    }
  }

  async login(login, password) {
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'POST',
      body: JSON.stringify({login, password}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();

    if (response.ok) {
      localStorage.setItem('auth-token', json.result.token);
      this.setState({
        isAuth: true,
        user: json.result.user.profile,
        error: '',
        token: json.result.token
      });
    } else {
      this.setState({
        isAuth: false,
        user: {},
        error: json.error,
        token: ''
      });
    }
  }

  async logout() {
    const token = this.getState().token;
    const response = await fetch('api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${token}`
      }
    });

    if (response.ok) {
      localStorage.removeItem('auth-token');
      this.setState({
        ...this.getState(),
        isAuth: false,
        token: '',
      });
    }
  }
}


export default AuthState;
