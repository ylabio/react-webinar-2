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
      user: {
        name: '',
        phone: '',
        email: '',
      },
      waiting: false,
    };
  }

    /**
   * Получить данные профиля
   */
  async getProfile(){
     // Установка признака загрузки
     this.setState({
      ...this.getState(),
      waiting: true,
    });

    const token = await localStorage.getItem('token');

    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Token': token
        }
      });
      const json = await response.json();

      this.setState({
        ...this.getState(),
        user: {
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email,
        },
        waiting: false,
    });
    } catch (e){
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }

}

export default ProfileState;
