import StateModule from '../module';
/**
 * Состояние товара
 */
class UserState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {},
      waiting: false
    };
  }



  async load(token) {
    this.setState({
      waiting: true,
      data: {}
    });
    try {
      const response = await fetch('/api/v1/users/self',
        {
          method: "GET", headers: {
            'Content-Type': 'application/json',
            "X-Token": token
          }
        });
      const json = await response.json();
      // User загружен успешно
      this.setState({
        data: json.result,
        waiting: false
      });
    } catch (e) {
      this.setState({
        data: {},
        waiting: false
      })
    }
  }
}

export default UserState;