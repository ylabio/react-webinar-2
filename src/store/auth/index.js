import StateModule from '../module';

/**
 * Управление модальными окнами
 */
class AuthState extends StateModule {
  initState() {
    return {
      userInfo:{
        login: null,
        id: null,
        token: null,
      },
      message: null
    };
  }

  /**
   * Авторизация пользователя
   */
  async setUser(login, password) {
    try {
      const response = await fetch(`api/v1/users/sign`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            login: login,
            password: password,
            remember: true,
          }),
        }
      );
        console.log(response);
      const json = await response.json();
        console.log(json);
      this.setState({
        userInfo: {
          login: user.login,
          id: user.id,
          token: user.token,
        }});
    } catch (e) {

      this.setState({
        userInfo: {},
        message: e.message
      });
    }
  }

  /**
   * Log out пользователя
   */
  async removeUser() {
    const response = await fetch(`/users/sign`,{
      method: 'DELETE',
      body:{
        'X-Token': token
      }
    });
    this.setState(
      {
        email: null,
        id: null,
        token: null,
      },
      `Log Out`
    );
  }
}

export default AuthState;
