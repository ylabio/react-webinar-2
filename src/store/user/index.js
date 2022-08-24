import StateModule from "../module";

/**
 *  Информация о пользователе
 */
class UserState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      userName: '',
      authorized: false,
      data: {},
      error: '',
      waiting: false
    };
  }
  /**
   * Авторизация пользователя
   */
  async authUser(login, password) {
    // Очистка параметров
    this.setState({
      ...this.getState(),
      error: '',
      authorized: false,
      waiting: true,
    });
    // Запрос токена авторизации с сервера
    const response = await fetch(`/api/v1//users/sign`, {
      method: 'POST',
      body: JSON.stringify({
        login: login,
        password: password
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });
    if (response.ok) {
      const json = await response.json();
      window.localStorage.setItem('access_token', json.result.token)

      // Пользователь успешно авторизован
      this.setState({
        ...this.getState(),
        userName: json.result.user.profile.name,
        authorized: true,
        waiting: false
      });
    } else {
      // Ошибка авторизации
      this.setState({
        ...this.getState(),
        error: 'Данные введены неверно: HTTP-Error: ' + response.status + '. Повторите ввод.',
        authorized: false,
        waiting: false
      });
    }
  }
  /**
   * Получение данных пользователя
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

      // Данные пользователя загружены успешно
      this.setState({
        ...this.getState(),
        data: json.result,
      });
    } else {
      // Ошибка при загрузке данных пользователя
      this.setState({
        ...this.getState(),
        error: 'Ошибка пользователя: ' + response.status,
      });
    }
  }
  /**
   * Выход пользователя из профиля
   */
  async setExit() {
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
      window.localStorage.setItem('access_token', '')
    }

    // Сброс данных к начальному состоянию
    this.setState({
      authorized: false,
      data: {},
      error: '',
      waiting: false
    })
  }

  // Сброс ошибки сервера
  resetError() {
    this.setState({
      ...this.getState(),
      error: ''
    });
  }
}

export default UserState;
