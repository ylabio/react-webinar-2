import StateModule from "../module";

class User extends StateModule {
  initState() {
    return {
      logged: false,
      token: '',
      info: {
        _id: '',
        name: '',
        phone: '',
        email: '',
      },
      loginState: {
        pending: false,
        error: false,
      },
    }
  }



  async login (login, password) {
    this.setState({
      ...this.getState(),
      loginState: {
        pending: true,
        error: false,
      },
    }, 'Авторизация')

    await fetch('/api/v1/users/sign?fields=_id,email,profile(name,phone)', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ login, password, remember: true }),
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error(res.status + ' ' + res.statusText);
      })
      .then(json => {
        this.setState({
          ...this.initState(),
          logged: true,
          token: json.result.token,
          info: {
            _id: json.result.user._id,
            name: json.result.user.profile.name,
            phone: json.result.user.profile.phone,
            email: json.result.user.email,
          },
        }, 'Пользователь авторизован');
      })
      .catch(err => {
        console.error('store.user.login() ' + err);
        this.setState({
          ...this.initState(),
          loginState: {
            pending: false,
            error: true,
          },
        }, 'Ошибка при авторизации')
      })
  }



  async logout () {
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': this.getState().token,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => {
        if (res.ok) {
          this.setState({ ...this.initState(), }, 'Пользователь разлогинился');
          document.cookie = `token=${this.getState().token}; max-age=-1`;
        }
        else throw new Error(res.status + ' ' + res.statusText);
      })
      .catch(err => {
        console.error('store.user.logout() ' + err);
      })
  }



  check () {
    let token = document.cookie.match(/token=([^;]+);?/);
    if (token === null) return;
    else token = token[1];

    fetch('/api/v1/users/self?fields=_id,email,profile(name,phone)', {
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error(res.status + ' ' + res.statusText);
      })
      .then(json => {
        this.setState({
          ...this.initState(),
          logged: true,
          token: token,
          info: {
            _id: json.result._id,
            name: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email,
          },
        }, 'Пользователь восстановлен');
      })
      .catch(err => {
        console.error('store.user.check() ' + err);
        this.setState({ ...this.initState() }, 'Сброшен стор user, удалён токен из куки');
      })
  }
}

export default User;