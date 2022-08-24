import StateModule from "../module";

class Profile extends StateModule {
  initState() {
    return {
      checking: true,
      logged: false,
      info: {
        name: '',
        phone: '',
        email: '',
      },
    };
  }

  unloggedState() {
    return {
      ...this.initState(),
      checking: false,
    };
  }

  async check() {
    let token = document.cookie.match(/token=([^;]+);?/);

    if (token === null) {
      this.setState({
        ...this.unloggedState(),
      }, 'Токен отсутствует, сброшен store.profile');
      return;
    }
    else token = token[1];

    this.setState({
      ...this.initState(),
    }, 'Восстановление пользователя');

    await fetch('/api/v1/users/self?fields=email,profile(name,phone)', {
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => {
        if (res.ok) return res.json();
        else throw new Error(res.status + ' ' + res.statusText);
      })
      .then(json => {
        this.setState({
          checking: false,
          logged: true,
          info: {
            name: json.result.profile.name,
            phone: json.result.profile.phone,
            email: json.result.email,
          },
        }, 'Пользователь восстановлен')
      })
      .catch(err => {
        console.error('store.profile.check() ' + err.message);
        document.cookie = `token=${token}; max-age=-1`;
        this.setState({
          ...this.unloggedState(),
        }, 'Сброшен store.profile, удалён токен из куки');
      })
  }

  async logout() {
    let token = document.cookie.match(/token=([^;]+);?/);
    if (token === null) return;
    else token = token[1];

    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json;charset=utf-8',
      },
    })
      .then(res => {
        if (res.ok) {
          document.cookie = `token=${token}; max-age=-1`;
          this.setState({
            ...this.unloggedState(),
          }, 'Пользователь разлогинился');
        }
        else throw new Error(res.status + ' ' + res.statusText);
      })
      .catch(err => {
        console.error('store.profile.logout() ' + err.message);
      })
  }
}

export default Profile;