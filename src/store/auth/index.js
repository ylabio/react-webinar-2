import StateModule from "../module";

class AuthState extends StateModule {
  initState() {
    return {
      auth: {
        login: '',
        password: '',
        isErr: false,
        errCode: null
      },
      user: null,
      isLoading: true,
      loadingErr: false
    }
  }

  setLogin(login) {
    const prevState = this.getState()
    this.setState({
      ...prevState,
      auth: {
        ...prevState.auth,
        login
      }
    }, `Изменение логина с ${prevState.auth.login} на ${login}`)
  }

  setPassword(password) {
    const prevState = this.getState()
    this.setState({
      ...prevState,
      auth: {
        ...prevState.auth,
        password
      }
    }, `Изменение пароля с ${prevState.auth.password} на ${password}`)
  }

  changeLoading(b) {
    this.setState({
      ...this.getState(),
      isLoading: b
    }, b ? 'Начало загрузки' : 'Конец загрузки')
  }

  async logIn() {
    this.setLoadingErr(false)
    this.changeLoading(true)

    const auth = this.getState().auth
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      body: JSON.stringify({login: auth.login, password: auth.password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()

    if (data.error) {
      this.setState({
        ...this.getState(),
        auth: {
          ...this.getState().auth,
          isErr: true,
          errCode: data.error.code
        }
      }, 'Получена ошибка ' + data.error.code)
      return
    }

    localStorage.setItem('TOKEN', data.result.token)

    this.setState({
      ...this.initState(),
      user: data.result.user
    }, 'Юзер успешно получен и подгружен, ожидание редиректа на profile')
    this.changeLoading(false)
  }

  async getProfile() {
    const token = localStorage.getItem('TOKEN')
    
    this.changeLoading(true)
    
    const res = await fetch('/api/v1/users/self', {
      headers: {
        "X-Token": token
      }
    })
    const data = await res.json()
    if (data.error) {
      this.setLoadingErr(true)   
      this.changeLoading(false)
      return
    }

    this.setState({
      ...this.getState(),
      isLoading: false,
      user: data.result
    }, 'Получен юзер по токену')
    
    this.changeLoading(false)
  }

  async logOut() {
    const token = localStorage.getItem('TOKEN')
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        "X-Token": token
      }
    })
    localStorage.removeItem('TOKEN')
    
    this.setState({
      ...this.getState(),
      user: null
    }, 'Выход на клиенте')
  }

  resetError() {
    this.setState({
      ...this.getState(),
      auth: {
        ...this.getState().auth,
        isErr: false,
        errCode: null
      }
    }, 'Обнуление ошибки')
  }

  setLoadingErr(b) {
    this.setState({
      ...this.getState(),
      loadingErr: b
    }, b ? 'Установка ошибки при подзагрузке' : 'Сброс ошибки при подзагрузке')
  }
}

export default AuthState