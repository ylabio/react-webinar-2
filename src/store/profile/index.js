import StateModule from '../module';

/**
 * Авторизация
 */
class Profile extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
    };
  }

  getUser(user) {
    this.setState({
      user: user,
    });
  }
}

export default Profile;
