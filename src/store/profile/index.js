import StateModule from "../module";

/**
 * Состояние профиля
 */
class ProfileState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {}
    };
  }

  /**
   * Запись данных о профиле
   */
  setUser(user){
    this.setState({
			user
		})
  }
}

export default ProfileState;
