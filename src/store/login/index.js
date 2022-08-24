import StateModule from "../module";

class Login extends StateModule {
  initState() {
    return {
      pending: false,
      logged: false,
      error: false,
      errorText: '',
    };
  }

  async login(login, password) {
    this.setState({
      ...this.initState(),
      pending: true,
    }, 'Авторизация');

    await fetch('/api/v1/users/sign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ login, password, remember: true }),
    })
      .then(res => {
        if (res.status === 200 || res.status === 400) return res.json();
        else throw new Error(res.status + ' ' + res.statusText);
      })
      .then(json => {
        if (json.result) {
          this.setState({
            ...this.initState(),
            pending: true,
            logged: true,
          }, 'Пользователь авторизован');
        }
        else if (json.error) {
          this.setState({
            ...this.initState(),
            error: true,
            errorText: json.error.data.issues[0].message,
          }, 'Ошибка при авторизации');
        }
        else throw new Error('Ошибка при обработке ответа');
      })
      .catch(err => {
        console.error('store.login.login() ' + err.message);
        this.setState({
          ...this.initState(),
          error: true,
          errorText: err.message,
        }, 'Ошибка при авторизации');
      })
  }

  clear() {
    this.setState({
      ...this.initState,
      pending: false,
    }, 'Сброшен store.login');
  }
}

export default Login;