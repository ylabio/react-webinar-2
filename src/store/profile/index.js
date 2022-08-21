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
        tel: '',
        email: '',
      }
    };
  }

  /**
   * Получить данные профиля
   */
  async getProfile(){
    // Сброс текущего товара и установка признака ожидания загрузки
    // this.setState({
    //   waiting: true,
    //   data: {}
    // });

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

      console.log("profile: ", json);

      this.setState({
        ...this.getState(),
        user: {
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email,
        }
    });
    } catch (e){
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        ...this.getState(),
        error: `${e}`
      });
      console.log("Error");
    }
  }

}

export default ProfileState;
