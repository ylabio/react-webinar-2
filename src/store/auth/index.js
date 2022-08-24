import StateModule from "../module";

/**
 * Состояние пользователя
 */
class AuthState extends StateModule{

  initState() {
    return {
      username: '',
      token: localStorage.getItem('authToken') || null,
      message: null
    };
  }

  /**
   * Login
   */
  async logIn(login, password) {
    await fetch('api/v1/users/sign?fields=_id,email,profile(name,phone)', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: login,
        password: password,
        remember: true,
      }),
    })
      .then(response => response.json())
      .then(result => {
        if(!result.error){
          localStorage.setItem('authToken', result.result.token)
          this.setState({
            username: result.result.username,
            token: result.result.token,
          });
        }
        else this.setState({
          ...this.getState(),
          message: result.error.data.issues[0].message,
        });
      })
  }
  /**
   * Logout
   */
  async logOut() {
    await fetch(`api/v1/users/sign`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token
      },
    });
    this.setState(
      {
        user: {},
        token: null,
        message: null,
      });
    localStorage.removeItem('authToken');
  }
  /**
   * Восстановить свой профиль
   */
  async restore() {
    this.getState().token && await fetch('api/v1/users/self', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token
      },
    })
      .then(response => response.json())
      .then(result => {
        this.setState({
          ...this.getState(),
          username: result.result.username,

        });
      });
  }
}

export default AuthState;
