import StateModule from "../module";

/**
 * Состояние аккаунта
 */
class UserState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      username: '',
      phone: '',
      email: '',
      waiting: false,
    };
  }

  /**
   * Загрузка аккаунта
   */
  async load(token){
    this.setState({
      username: '',
      phone: '',
      email: '',
      waiting: true,
    });

    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'X-Token': token,
        },
      });
      const json = await response.json();
      if (!json.error) {
        this.setState({
          username: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email,
          waiting: false,
        }, 'Вход в аккаунт с токена');
      }
      else {
        localStorage.removeItem('token');
      }
    } catch (e){
      this.setState({
        username: '',
        phone: '',
        email: '',
        waiting: false,
      }, 'Ошибка');
    }
  }
}

export default UserState;
