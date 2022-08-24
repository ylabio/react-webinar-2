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
        waiting: false
      })
    } catch (e) {
      this.setState({
        user: {},
        waiting: false
      })
    }
  }

  clear() {
    this.setState({
      user: {},
      waiting: false
    })
  }
}

export default AuthState;