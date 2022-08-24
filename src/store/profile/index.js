import StateModule from "../module";

/**
 * Состояние профиля
 */
class ProfileState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      userData: null, // инфа от сервера
      customData: {} // прочая инфа, не зависящая от сессии, например список просмотренного
    };
  }

  /**
   * Передать поля юзера, полученные от сервера
   */
  setUserData(userData) {
    this.setState({
      ...this.getState(),
      userData,
    }, 'Set user data');
  }

  /**
   * Передать прочие параметры (пока заглушка - object)
   */
  setCustomData(customData) {
    this.setState({
      ...this.getState(),
      custom,
    }, 'Set user custom data');
  }

}

export default ProfileState;