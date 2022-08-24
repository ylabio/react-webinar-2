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
      data: {},
      waiting: false
    };
  }

  async getProfile(token) {
    
    this.setState({
        waiting: true,
        data: {}
      });
    try {
        const response = await fetch("/api/v1/users/self", {
            method: 'GET',
            headers: {
                'X-Token': token,
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        if (json.error) {
            this.setState({
                data: {},
                waiting: false,
            });
        } else {
            this.setState({
                data: {...json.result},
                waiting: false,
              });
        }

    } catch (e) {
        this.setState({
            data: {},
            waiting: false,

          });
    }
  }
}

export default ProfileState;
