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
      username: '',

      login: {
        username: '',
        password: '',
        error: ''
      }
    };
  }

  login() {
    this.setState({
      isSigned: true,
      username: 'test'
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
}

export default AuthState;
