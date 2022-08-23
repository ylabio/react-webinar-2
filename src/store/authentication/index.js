import StateModule from "../module";

/**
 * Состояние товара
 */
class AuthenticationState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {

      },
      token: localStorage.getItem('token'),
      errorMessage: "",
      waiting: true,
      isAuth: false
    };
  }
  
  async logIn(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true
    })
    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        body: JSON.stringify({
          login: login,
          password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      })

      if(!res.ok) {
        throw new Error(`Неверный логин или пароль`)
      }

      const data = await res.json();
      localStorage.setItem('token', data.result.token);

      this.setState({
        user: data.result.user,
        token: data.result.token,
        errorMessage: "",
        waiting: false,
        isAuth: true
      })
    } catch(e) {
      console.log(e);
      this.setState({
        ...this.getState(),
        errorMessage: e.message,
        waiting: false,
        isAuth: false
      });
    }
  }

  async logOut() {
    this.setState({
      ...this.getState(),
      waiting: true
    })
    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        body: null,
        headers: {
            'Content-Type': 'application/json',
            'X-Token': `${this.getState().token}`
        }
      })

      localStorage.removeItem('token');
      this.setState({
        user: {},
        token: "",
        errorMessage: "",
        waiting: false,
        isAuth: false
      })
    } catch(e) {
      console.log(e);
      this.setState({
        ...this.getState(),
        waiting: false
      });
    }
  }

  async logInByToken(token) {
    try {
      this.setState({
        ...this.getState(),
        waiting: true
      });

      const res = await fetch('/api/v1/users/self', {
        method: 'GET',
        body: null,
        headers: {
            'Content-Type': 'application/json',
            'X-Token': this.getState().token
        }
      })

      if(!res.ok) {
        throw new Error(`Неверный токен`);
      }

      const data = await res.json();

      this.setState({
        ...this.getState(),
        user: data.result,
        errorMessage: "",
        waiting: false,
        isAuth: true
      });
    } catch(e) {
      this.setState({
        ...this.getState(),
        waiting: false
      });
      localStorage.removeItem('token');
    }
  }
}

export default AuthenticationState;
