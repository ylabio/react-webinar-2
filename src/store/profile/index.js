import StateModule from '../module'

/**
 * Состояние профиля
 */
class ProfileState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {
        name: '',
        phone: '',
        email: '',
      },
      auth: false,
      error: '',
      waiting: false,
    }
  }

  /**
   * Запрос на авторизацию и получение данных пользователя
   */
  async login(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true,
    })

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })

      const json = await response.json()
      console.log(json)

      localStorage.setItem('token', json.result.token)

      this.setState({
        ...this.getState(),
        user: {
          name: json.result.user.profile.name,
          phone: json.result.user.profile.phone,
          email: json.result.user.email,
        },
        auth: true,
        waiting: false,
      })
    } catch (err) {
      this.setState({
        ...this.getState(),
        error: `${err.message ? err.message : 'Ошибка сервера'}`,
        waiting: false,
      })
    }
  }

  async getProfile() {
    this.setState({
      ...this.getState(),
      waiting: true,
    })

    const token = await localStorage.getItem('token')

    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      })

      const json = await response.json()

      this.setState({
        ...this.getState(),
        user: {
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email,
        },
        auth: true,
        waiting: false,
      })
    } catch (err) {
      this.setState({
        ...this.getState(),
        auth: false,
        waiting: false,
      })
      console.log(err.message)
    }
  }
  /**
   * Выход из учётной записи
   */
  async logOut() {
    // Установка признака загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    })

    const token = await localStorage.getItem('token')

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      })
      if (response.status == 200) {
        await localStorage.removeItem('token')

        // Пользователь разлогинен
        this.setState({
          user: {},
          auth: false,
          error: '',
          waiting: false,
        })
      }
    } catch (e) {
      this.setState({
        user: {},
        auth: false,
        error: '',
        waiting: false,
      })
    }
  }
}

export default ProfileState
