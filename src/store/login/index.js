import StateModule from "../module";

class LoginState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: '',
      isAuth: false,
      waiting: false,
    };
  }

  /**
   * Проверка на авторизацию
   */
  async checkLogin(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    this.store.setState({
      ...this.store.getState(),
      error: {
        err:[]
      }
    })

    const response = await fetch(`/api/v1/users/self`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${token}`
      },
    });
    const json = await response.json();

    if (!!json.result) {
      this.setState({
        ...this.getState(),
        token: token,
        user: json.result,
        isAuth: true,
        waiting: false
      });
    } else {
      this.setState({
        ...this.getState(),
        token: '',
        user: {},
        isAuth: false,
        waiting: false
      });

      localStorage.removeItem('token');
    }
  }

  /**
   * Авторизация
   */
  async logIn (data){
    this.setState({
      ...this.getState(),
      waiting: true
    });

    this.store.setState({
      ...this.store.getState(),
      error: {
        err:[]
      }
    })

    let json;

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      json = await response.json();

      if (json.result.token) {
        this.setState({
          ...this.getState(),
          token: json.result.token,
          user: json.result.user,
          isAuth: true,
          waiting: false
        });

        localStorage.setItem('token', json.result.token);
      }
    } catch (e){
      this.setState({
        user: {},
        isAuth: false,
        waiting: false
      });
      this.store.setState({
        ...this.store.getState(),
        error: {
          err: json.error.data.issues
        }
      })
    }
  }

  /**
   * Выход
   */
  async logOut (token){
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const response = await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${token}`
      },
    });
    const json = await response.json();

    if (json.result) {
      this.setState({
        ...this.getState(),
        user: {},
        token: '',
        isAuth: false,
        waiting: false
      });
    }
  }
}

export default LoginState;
