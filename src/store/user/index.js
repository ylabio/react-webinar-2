import StateModule from '../module';

/**
 * Состояние авторизованного пользователя
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

  /**
   *  назначение текущего пользователя
   * @param {Object} user
   */
  setUser(user) {
    this.setState({
      ...this.getState(),
      currentUser: user
    });
  }

  /**
   * сброс текущего пользователя
   */
  resetUser() {
    this.setState({
      currentUser: {}
    });
  }
}

export default User;
