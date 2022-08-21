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
      isSigned: false,
      token: '',
      error: '',
      login: null
    };
  }

  async login(login, password) {
    let token = '';
    let error = '';
    const response = await fetch('api/v1/users/sign', {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login, password }),
      method: 'POST'
    });
    if (!response.ok) {
      error = response.statusText;
    } else {
      token = (await response.json()).result.token;
      localStorage.setItem('auth-token', token);
    }
    this.setState({
      ...this.getState(),
      isSigned: error ? false : true,
      token,
      error,
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
    this.setState({
      ...this.getState(),
      isSigned: false,
      token: '',
      login: null
    });
  }
}

export default AuthState;