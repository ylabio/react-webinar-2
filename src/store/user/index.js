import StateModule from '../module';
/**
 * Состояние товара
 */
class UserState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      data: {},
      auth: false,
      token: localStorage.getItem('token') ?? '',
      login: {
        error: '',
      }
    };
  }

  async login(log, pas) {
    try {
      const response = await fetch('api/v1/users/sign', {
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({login: log, password: pas}),
        method: 'POST'
      });

      const json = await response.json();
      if (json.error) throw new Error(json.error.data?.issues[0]?.message || json.error.message);
      localStorage.setItem('token', json.result.token);
      // User загружен успешно
      this.setState({
        ...this.getState(),
        data: json.result.user,
        auth: true,
        token: json.result.token,
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
        auth: false,
        login: {error: e.message}
      })
    }


  }

  async logout() {
    await fetch('api/v1/users/sign', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${this.getState().token}`
      },
      method: 'DELETE'
    });
      localStorage.removeItem('token');
      this.setState(this.initState());
  }

  async load() {
    try {
      const response = await fetch('/api/v1/users/self',
        {
          method: "GET", headers: {
            'Content-Type': 'application/json',
            "X-Token": `${this.getState().token}`
          }
        });
      const json = await response.json();
      // User загружен успешно
      this.setState({
        ...this.getState(),
        data: json.result, error: '',
        auth: true,
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
        auth: false,
      })
    }
  }
}

export default UserState;