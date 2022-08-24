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
      profile: {}
    };
  }

  /**
   * Загрузка профиля
   */
  setProfile(profile){
    this.setState({
      profile: {...profile}
    });
  }
}

export default ProfileState;
