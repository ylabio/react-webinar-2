import StateModule from "../module";

/**
 * Состояние товара
 */
class ProfileState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {},
      error: '',
    };
  }

  /**
   * Получение данных профиля пользователя
   */
  async setProfile() {
    const myHeaders = new Headers({
      'Content-Type': 'application/json; charset=UTF-8"',
      'X-Token': window.localStorage.getItem('access_token')
    })
    const response = await fetch(`/api/v1//users/self`, {
      method: 'GET',
      headers: myHeaders
    });
    if (response.ok) {
      const json = await response.json();

      // Данные профиля пользователя загружены успешно
      this.setState({
        data: json.result,
        error: ''
      });
    } else {
      // Ошибка при загрузке данных профиля пользователя
      this.setState({
        data: {},
        error: 'Ошибка пользователя: ' + response.status,
      });
    }
  }
  /**
   * Выход пользователя из профиля
   */
  async setExitProfile() {
    const myHeaders = new Headers({
      'Content-Type': 'application/json; charset=UTF-8"',
      'X-Token': window.localStorage.getItem('access_token')
    })
    // Удаление токена на сервере и из памяти браузера
    const response = await fetch(`/api/v1//users/sign`, {
      method: 'DELETE',
      headers: myHeaders
    });
    console.log('DELETE response', response.json)
    if (response.ok) {
      window.localStorage.setItem('access_token', '');
      this.setState({
        data: {},
        error: ''
      });
    } else {
      // Ошибка при удалении данных профиля пользователя
      this.setState({
        ...this.getState(),
        error: 'Ошибка пользователя: ' + response.status,
      });
    }

    // Сброс данных к начальному состоянию
    this.setState({
      data: {},
      error: '',
    })
  }
}

export default ProfileState;
