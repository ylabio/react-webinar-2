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
      isSigned: true,
      token: '',
      error: '',
      login: null
    };
  }

  async login(login, password) {
    let token = '';
    let error = '';
    const response = await (
      await fetch('api/v1/users/sign', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password }),
        method: 'POST'
      })).json();
    if (response.error) {
      error = response.error.data?.issues[0].message
      this.setState({
        ...this.getState(),
        isSigned: false,
        error: error
      });
    }
    else {
      error = "";
      token = response.result.token;
      localStorage.setItem('auth-token', token);
      this.setState({
        ...this.getState(),
        isSigned: true,
        token: token,
        error: error,
      });
      this.store.get('profile').fetchProfile(localStorage.getItem('auth-token'))
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