import StateModule from "../module";

/**
 * Состояние профиля пользователя
 */
class ProfileState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      name: "",
      phone: "",
      email: "",
      waiting: true,
      error: "" 
    };
  }
}

export default ProfileState;