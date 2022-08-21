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
      token: "",
      errorMessage: "",
      waiting: true
    };
  }

  /**
   * Загрузка списка товаров
   */
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
        waiting: false
      })
    } catch(e) {
      console.log(e);
      this.setState({
        ...this.getState(),
        errorMessage: e.message,
        waiting: false
      });
    }
    
    // await fetch('/api/v1/users/sign', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     login: login,
    //     password: password
    //   }),
    //   headers: {
    //       'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     // console.log(data);
    //       localStorage.setItem('token', data.result.token);
    //       this.setState({
    //         user: data.result.user,
    //         token: data.result.token,
    //         errorMessage: "",
    //         waiting: false
    //       })
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     this.setState({
    //       ...this.getState(),
    //       // errorMessage: e.
    //       waiting: false
    //     });
    //   })
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
        waiting: false
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
            'X-Token': token
        }
      })

      if(!res.ok) {
        throw new Error(`Неверный токен`);
      }

      const data = await res.json();
      console.log(data.result);

      this.setState({
        user: data.result,
        token: token,
        errorMessage: "",
        waiting: false
      });
    } catch(e) {
      console.log(e.message);
      this.setState({
        ...this.getState(),
        waiting: false
      });
      localStorage.removeItem('token');
    }
    // console.log(token);
  }
}

export default AuthenticationState;
