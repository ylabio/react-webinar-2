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
      login: {
        username: '',
        password: '',
        error: ''
      }
    };
  }

  async login() {
    const login = this.getState().login.username;
    const password = this.getState().login.password;

    let token = '';
    let error = '';

    const response = await fetch('api/v1/users/sign', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({login, password}),
      method: 'POST'
    });

    const json = await response.json();

    if (json.error) {
      console.log(json.error);
      error = json.error.data.issues.reduce((acc, cur) => `${acc}${cur.message}\n`, '');
    } else {
      token = json.result.token;
      localStorage.setItem('auth-token', token);
    }

    this.setState({
      ...this.getState(),
      login: {
        ...this.getState().login,
        error
      }
    });
    this.store.get('session').setState({
      ...this.store.get('session').getState(),
      token,
      isSigned: error ? false : true
    });
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

    localStorage.setItem('auth-token', '');

    this.store.get('session').setState({
      ...this.store.get('session').getState(),
      token: ''
    });
  }

  /**
   * @param {password?: string, login?: string, error?: string} data
   */
  setLoginData(data) {
    this.setState({
      ...this.getState(),
      login: {
        ...this.getState().login,
        ...data
      }
    });
  }

  clearInputFields() {
    this.setState({
      ...this.getState(),
      login: {
        username: '',
        password: '',
        error: ''
      }
    });
  }
}

export default AuthState;
