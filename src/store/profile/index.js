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
      userData: {},
    };
  }

  // загрузка данных пользователя в state
  async loadUser() {

    const token = localStorage.getItem('authToken');

    // Если токена нету, то не будет и запроса для проверки его работоспособности
    if (!token) return

    const requestOptions = {
      method: 'GET',
      headers: {
        'X-Token': token,
      },
    }

    const res = await fetch('/api/v1/users/self', requestOptions);
    const json = await res.json();

    this.setState({
      ...this.getState(),
      userData: json.result,
    }, 'Загрузка данных пользователя');
  }
}

export default ProfileState;