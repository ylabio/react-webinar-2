import StateModule from "../module";

class ProfileState extends StateModule {

  initState() {
    return {
      token: '',
      user: {},
      error: {}
    };
  };

  async loadUser() {
    const token = localStorage.getItem('auth-token');

    if (!token) return

    const res = await fetch('/api/v1/users/self', {
      method: 'GET',
      headers: {
        'X-Token': token,
      },
    });

    const json = await res.json();

    this.setState({
      ...this.getState(),
      user: json.result,
      token,
    });
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
        user: json.result.user,
        error: '',
        token: json.result.token
      });
    } else {
      this.setState({
        user: {},
        error: json.error,
        token: ''
      });
    }
  }

  async logout() {
    const token = this.getState().token;
    const response = await fetch('api/v1/users/sign', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${token}`
      },
      method: 'DELETE'
    });

    if (response.ok) {
      localStorage.removeItem('auth-token');
      this.setState({
        ...this.getState(),
        token: '',
      });
    }
  }
}


export default ProfileState;
