import StateModule from "../module";
import Cookies from 'js-cookie'

class AuthModule extends StateModule {
    /**
   * Начальное состояние
   * @return {Object}
   */
     initState() {
      return {
        token: Cookies.get('token'),
        user: null,
        status: null,
        waiting: false
      }
    }

  /**
   * Загрузка данных пользователя по токену, выполняется при наличии токена
   * @returns {Promise<void>}
   */
  async loadUser() {
    this.setState({...this.getState(), waiting: true})

    // Отсылаем запрос только при наличии токена
    if (this.getState().token) {
      const response = await fetch(`/api/v1/users/self?fields=_id,email,profile(phone, name)`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': this.getState().token
        }
      })
      const json = await response.json()
      if (response.status === 200) {
        this.setState({
          ...this.getState(),
          user: json.result,
          status: 'auth_successful',
          waiting: false
        }, 'Загрузка пользователя по токену - успешно')
      } else {
        this.setState({
          ...this.getState(),
          status: 'auth_failed',
          waiting: false,
        }, 'Загрузка пользователя по токену - неуспех, на сервере нет такого токена')
      }
    } else {
      this.setState({
        ...this.getState(),
        status: 'auth_failed',
        waiting: false
      }, 'Загрузка пользователя по токену - неуспех, отсутствует токен')
    }
  }
      
  /**
   * Логин пользователя
   * @param {loginData} {'login': '...', 'password': '...'}
   * @returns {Promise<void>}
   */
  async login(loginData) {
    this.setState({...this.getState(), waiting: true})
    const response = await fetch('/api/v1/users/sign?fields=_id,email,profile(phone,name)', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    })
    const json = await response.json()

    if (json.error) {
      this.setState({...this.getState(), waiting: false})
      throw new Error(json.error.data.issues.map(issue => issue.message))
    }

    Cookies.set('token', json.result.token)
    this.setState({
      ...this.getState(),
      token: json.result.token,
      user: json.result.user,
      status: 'auth_successful',
      waiting: false
    }, 'Login')
  }

  /**
   * Логаут пользователя
   * @returns {Promise<void>}
   */
  async logout() {
    this.setState({...this.getState(), waiting: true})
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token
      }
    })
    Cookies.remove('token', {path: ''})

    this.setState({
      ...this.getState(),
      token: '',
      user: null,
      status: 'auth_failed',
      waiting: false
    }, 'Logout')
  }
}

export default AuthModule