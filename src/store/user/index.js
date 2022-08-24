import StateModule from "../module";

/**
 * Состояние профиля
 */
class UserState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      profile: {},
    };
  }
  async getProfileInfo(token) {
    token && await fetch('api/v1/users/self', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': token
      },
    })
      .then(response => response.json())
      .then(result => {
        console.log('user result ', result)
        this.setState({
          ...this.getState(),
          profile: {...result.result.profile, email: result.result.email}
        });
      });
  }


}

export default UserState;
