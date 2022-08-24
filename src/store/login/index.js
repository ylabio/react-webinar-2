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
      complete: false,
    };
  }

  /**
   * Проверка на авторизацию
   */
  async checkLogin() {
    this.setState({
      ...this.getState(),
      complete: false,
      waiting: true,
    });

    const token = localStorage.getItem('token') || '';

    if (!token) {
      return this.setState({
        complete: true,
        token: '',
        user: {},
        isAuth: false,
        waiting: false
      });
    }

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
        complete: true,
        token: token,
        user: json.result,
        isAuth: true,
        waiting: false
      });
    } else {
      this.setState({
        complete: true,
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
      complete: false,
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
          complete: true,
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
        token: '',
        isAuth: false,
        waiting: false,
        complete: true,
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
      complete: false,
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
        complete: true,
        user: {},
        token: '',
        isAuth: false,
        waiting: false
      });
    }
  }
}

export default LoginState;
