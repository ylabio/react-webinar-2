import StateModule from "../module";

/**
 * Состояние статуса авторизации
 */
class LoginState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      status: null,
      user: null,
      error: null,
    };
  }
 
  async login(data={}) {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
      });

      const json = await response.json();

        this.setState({
          status: 'auth',
          user: json.result.user,
          error: null,
        });
    } catch (err) {
      this.setState({
        status: 'no_auth',
        user: null,
        error: err.message,
      });
    }
  }

  async isAuth() {
    this.setState({
      status: null,
      user: null,
      error: null,
    });

    const token = "user-token";

    const response = await fetch(`/api/v1/users/self`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${token}`
      }
    });
    const json = await response.json();
    
    if (response.status === 200) {
      this.setState({
        ...this.getState(),
        status: 'auth',
        user: json.result,
      });
    } else {
      this.setState({
        ...this.getState(),
        status: 'no_auth',
        user: json.result,
      });
    }
  }

  logout() {
    this.setState({
      ...this.getState(),
      status: 'no_auth',
      user: null,
    });
  }
}

export default LoginState;
