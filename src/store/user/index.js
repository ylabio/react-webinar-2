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
      error: '',
      waiting: false
    };
  }
  /**
   * Авторизация пользователя
   */
  async openUser(login, password) {
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
        error: 'Данные введены неверно. Повторите ввод. HTTP status: ' + response.status + ', text: ' + response.statusText + '.',
        authorized: false,
        waiting: false
      });
    }
  }

  // Завершение сеанса пользователя
  closeUser() {
    this.setState({
      userName: '',
      authorized: false,
      error: '',
      waiting: false
    });
  }

  // Восстановление сеанса пользователя
  async restoreUser() {
    // Установка параметра ожидания
    this.setState({
      ...this.getState(),
      waiting: true
    });
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
      console.log('restoreUser data', json);

      // Сеанс пользователя восстановлен успешно
      this.setState({
        userName: json.result.profile.name,
        authorized: true,
        error: '',
        waiting: false
      });
    } else {
      // Ошибка при восстановлении сеанса пользователя
      this.setState({
        userName: '',
        authorized: false,
        error: 'Ошибка при восстановлении сеанса пользователя: ' + response.status,
        waiting: false
      });
    }
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
