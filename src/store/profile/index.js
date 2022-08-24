import StateModule from "../module";

/**
 * Состояние товара
 */
class ProfileState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      waiting: true
    };
  }

  async loadUser(token) {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    try {
      const res = await fetch('/api/v1/users/self', {
        method: 'GET',
        body: null,
        headers: {
            'Content-Type': 'application/json',
            'X-Token': token
        }
      })

      if(!res.ok) {
        throw new Error(`Неверный токен`);
      }

      const data = await res.json();

      this.setState({
        user: data.result,
        waiting: false,
      });
    } catch(e) {
      this.setState({
        ...this.getState(),
        waiting: false
      });
      localStorage.removeItem('token');
    }
  }
}

export default ProfileState;
