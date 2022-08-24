import StateModule from '../module';

/**
 * Состояние товара
 */
class SessionState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      isFetching: true,
      isSigned: false,
      token: ''
    };
  }

  async checkToken() {
    const token = localStorage.getItem('auth-token');
    this.setState({
      ...this.getState(),
      token
    });
    await this.store.get('profile').fetchProfile(token);
    this.setState({
      ...this.getState(),
      isFetching: false
    });
  }
}

export default SessionState;
