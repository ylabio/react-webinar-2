import StateModule from "../module";

/**
 * Состояние авторизации
 */
class AuthState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      error: '',
      waiting: false
    };
  }


  /**
   * Получение информации о юезере по токену
   * @param token
   */
  async checkProfile(token) {
    // Сброс текущего состояния и установка признака загрузки
    this.setState({
      user: {},
      error: '',
      waiting: true
    })

    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: { 'X-Token': token, "Content-Type": "application/json" }
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(`${json.error.data.issues[0].message}`)
      }

      this.setState({
        user: json.result,
        error: '',
        waiting: false
      })
    } catch (e) {
      this.setState({
        user: {},
        error: e.message,
        waiting: false
      })
    }
  }

  clear() {
    this.setState({
      user: {},
      error: '',
      waiting: false
    })
  }
}

export default AuthState;