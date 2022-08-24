import StateModule from "../module";

/**
 * Состояние авторизации
 */
class ProfileState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      waiting: false,
    };
  }

  /**
   * Запрос на проверку авторизации
   * @returns {Promise<void>}
   */
  async self() {
    this.setState({
      waiting: true,
      user: {}
    });

    try {
      const temp = localStorage.getItem('user_secret');
      const token = temp && JSON.parse(temp);
      const response = await fetch(`/api/v1/users/self`, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();

      if (json.result.error) {
        this.setState({
          ...this.getState(),
          waiting: false
        });
      }
      if (!json.result.error) {
        this.setState({
          ...this.getState(),
          isLogin: true,
          user: json.result,
          waiting: false
        });
      }
    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false
      });
    }
  }

}

export default ProfileState;
