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

  /**
   * Загрузка данных пользователя
   */
   async loadUserData() {
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': this.store.get('auth').getState().token
        }
      });
      // Проверяем ответ сервера
      await this.store.get('auth').checkResponse(response);
      const json = await response.json();

      this.setState({
        ...this.getState(),
        name: json.result.profile.name,
        phone: json.result.profile.phone,
        email: json.result.email,
        waiting: false 
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
        waiting: false
      });
    }
  }

   /**
   * Сброс данных пользователя
   */
  clearUserData() {
    this.setState(this.initState());
  }
}

export default ProfileState;