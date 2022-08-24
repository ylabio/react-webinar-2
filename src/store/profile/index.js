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
      user: {},
      auth: false,
      error: '',
      waiting: false,
      locateKey: '',
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
      await localStorage.setItem('token', json.result.token)

      if (json.error) {
        this.setState({
          ...this.getState(),
          error: json.error.message,
          waiting: false,
        })
      } else {
        this.setState({
          ...this.getState(),
          user: { ...json.result.user.profile, email: json.result.user.email },
          auth: true,
          waiting: false,
        })
      }
    } catch (err) {
      this.setState({
        ...this.getState(),
        error: 'Не верный логин или пароль',
        waiting: false,
      })
      console.log(err.message)
    }
  }
  async setLocateKey(locateKey) {
    this.setState({
      ...this.getState(),
      locateKey: locateKey,
    })
  }
  async clearLocateKey(locateKey) {
    this.setState({
      ...this.getState(),
      locateKey: '',
    })
  }

  async initUser() {
    const token = localStorage.getItem('token')
    if (token) {
      this.getProfile()
    }
  }

  async getProfile() {
    this.setState({
      ...this.getState(),
      waiting: true,
    })

    const token = localStorage.getItem('token')

    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      })

      const json = await response.json()

      if (token && json.error) {
        this.setState({
          ...this.getState(),
          error: json.error.message,
          waiting: false,
        })
      } else {
        this.setState({
          ...this.getState(),
          user: { ...json.result.profile, email: json.result.email },
          auth: true,
          waiting: false,
        })
      }
    } catch (err) {
      if (token && err) {
        this.setState({
          ...this.getState(),
          error: err,
          waiting: false,
        })
      }
      console.log(err.message)
    }
  }

  async logOut() {
    localStorage.clear()
    this.setState({
      ...this.getState(),
      user: {},
      auth: false,
      error: '',
    })
  }
}

export default ProfileState
