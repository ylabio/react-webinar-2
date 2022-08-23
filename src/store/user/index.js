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
      authorized: false,
      data: {},
      error: '',
      waiting: false
    };
  }

  /**
   * Загрузка информации о пользователе
   */
  async authUser() {
    // Установка признака ожидания загрузки
    this.setState({
      ...this.getState(),
      error: '',
      authorized: false,
      waiting: true,
    });
    // Авторизация
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
      console.log('local storage token', window.localStorage.getItem('access_token'));

      // Данные о пользователе получены успешно
      this.setState({
        ...this.getState(),
        data: json.result,
        authorized: true,
        waiting: false
      });
    } else {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        error: 'Данные введены неверно: HTTP-Error: ' + response.status + '. Повторите ввод.',
        authorized: false,
        waiting: false
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

  async setExit() {
    const myHeaders = new Headers({
      'Content-Type': 'application/json; charset=UTF-8"',
      'Authorization': window.localStorage.getItem('access_token')
    })
    // Выход пользователя из профиля
    const response = await fetch(`/api/v1//users/sign`, {
      method: 'DELETE',
      body: JSON.stringify({
        'X-Token': window.localStorage.getItem('access_token')
      }),
      headers: myHeaders
    });

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
