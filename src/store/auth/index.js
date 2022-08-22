import StateModule from "../module";

class AuthState extends StateModule {
  initState() {
    return {
      login: '',
      password: '',
      isErr: false,
      errCode: null
    }
  }

  setLogin(login) {
    this.setState({
      ...this.getState(),
      login
    }, `Изменение логина на ${login}`)
  }

  setPassword(password) {
    this.setState({
        ...this.getState(),
        password
    }, `Изменение пароля на ${password}`)
  }

  async logIn() {
    this.store.get('session').setLoadingErr(false)
    this.store.get('session').changeLoading(true)

    const auth = this.getState()
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
        isErr: true,
        errCode: data.error.code
      }, 'Получена ошибка ' + data.error.code)
      return
    }

    localStorage.setItem('TOKEN', data.result.token)

    this.store.get('session').setUser(data.result.user)
    this.store.get('session').changeLoading(false)
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
}

export default AuthState