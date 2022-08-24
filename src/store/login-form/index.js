import StateModule from "../module";

//Не понял необходимости делать лишний модуль, если ошибку можно хранить и в auth, ведь это ошибка аутентификации
class LoginFormState extends StateModule {

  initState() {
    return {
      login: '',
      password: '',
      error: '',
    };
  }

  async login() {
    try {
      const response = await fetch('api/v1/users/sign', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({login: this.getState().login, password: this.getState().password}),
        method: 'POST'
      });

      const json = await response.json();
      if (json.error) throw new Error(json.error.data?.issues[0]?.message || json.error.message);
      localStorage.setItem('token', json.result.token);
      // User загружен успешно
      this.store.get('auth').setData(json.result.user, json.result.token);

    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message
      })
    }


  }

  changeLog(log) {
    this.setState({
      ...this.getState(),
      login: log
    });
  }

  changePas(pas) {
    this.setState({
      ...this.getState(),
      password: pas
    });
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: ''
    });
  }
}

export default LoginFormState;