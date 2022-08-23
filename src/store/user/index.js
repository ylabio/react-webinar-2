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
      login: '',
      password: '',
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
  async authUser() {
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
        login: this.getState().login,
        password: this.getState().password
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
        login: '',
        password: '',
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

  setLogin(login) {
    // Ввод логина
    this.setState({
      ...this.getState(),
      login: login
    });
  }

  setPassword(password) {
    // Ввод пароля
    this.setState({
      ...this.getState(),
      password: password
    });
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
      login: '',
      password: '',
      authorized: false,
      data: {},
      error: '',
      waiting: false
    })
  }
}

export default UserState;
