import StateModule from '../module';

/**
 * Управление модальными окнами
 */
class AuthState extends StateModule {
  initState() {
    return {
      user: {},
      token: localStorage.getItem('authToken') || null,
      message: null,
    };
  }

  /**
   * Авторизация пользователя
   */
  async setUser(login, password) {
    fetch('api/v1/users/sign', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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
            user: result.result.user,
            token: result.result.token,
          });
        } else {
          throw new Error(result.error.data.issues[0].message)
        }

      })
      .catch(error => {
        this.setState({
          ...this.getState(),
          message: error.message,
        });
      });
  }

  /**
   * Свой профиль
   */
  async setSelf() {
    this.getState().token && fetch('api/v1/users/self', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token
      },
    })
    .then(response=>response.json())
    .then(result => {
      this.setState({
        ...this.getState(),
        user: result.result,
      });
    });
  }

  /**
   * Log out пользователя
   */
  async removeUser() {
    fetch(`api/v1/users/sign`, {
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
}

export default AuthState;
