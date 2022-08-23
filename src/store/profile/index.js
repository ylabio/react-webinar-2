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
        error: err,
        waiting: false,
      })
      console.log(err.message)
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
          Accept: 'application/json',
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
    this.setState({
      ...this.getState(),
      user: {},
      auth: false,
      error: '',
    })
    await localStorage.removeItem('token')
  }
}

export default ProfileState
