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

  async loadUser() {
    // this.setState({});

    const xToken = this.getState().login.xToken;
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'X-Token': xToken}
      });
      const json = await response.json();
      const user = json.result.result;

      this.setState({
        ...this.getState(),
        currentUser: user
      });
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        currentUser: {}
      });
    }
  }
}

export default User;
