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
      username: ''
    };
  }

  login() {
    this.setState({
      isSigned: true,
      username: 'test'
    });
  }
}

export default AuthState;
