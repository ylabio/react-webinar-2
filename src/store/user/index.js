import StateModule from '../module';

/**
 * Состояние товара
 */
class User extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      currentUser: {}
    };
  }

  setUser(user) {
    this.setState({
      ...this.getState(),
      currentUser: user
    });
  }

  resetUser() {
    this.setState({
      currentUser: {}
    });
  }

  async loadUser() {
    
  }
}

export default User;
