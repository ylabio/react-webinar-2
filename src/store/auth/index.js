import StateModule from "../module";

class AuthState extends StateModule {
  initState() {
    return {
      login: '',
      password: '',
      isErr: false,
      errCode: null
    }
  };

  setLogin(login) {
    this.setState({
      ...this.getState(),
      login
    }, 'Ввод логина')
  };

  setPassword(password) {
    this.setState({
        ...this.getState(),
        password
    }, 'Ввод пароля')
  };

  async logIn() {
    this.store.get('profile').setLoadingErr(false);
    this.store.get('profile').changeLoading(true);

    const auth = this.getState();
    const response = await fetch('/api/v1/users/sign', {
      method: 'POST',
      body: JSON.stringify({login: auth.login, password: auth.password}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json();

    if (data.error) {
      this.setState({
        ...this.getState(),
        isErr: true,
        errCode: data.error.code
      }, 'Получена ошибка ' + data.error.code)
      return
    };

    localStorage.setItem('TOKEN', data.result.token)

    this.store.get('profile').setUser(data.result.user)
    this.store.get('profile').changeLoading(false)
  };

  resetError() {
    this.setState({
      ...this.getState(),
      auth: {
        ...this.getState().auth,
        isErr: false,
        errCode: null
      }
    }, 'Обнуление ошибки')
  };

  resetState() {
    this.setState({
      ...this.initState()
    })
  }
};

export default AuthState;