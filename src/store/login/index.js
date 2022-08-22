import StateModule from '../module';

/**
 * Состояние товара
 */
class Login extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      xToken: '',
      isAuthorized: false,
      error: {}
    };
  }

  async signIn(login, password) {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({login, password, remember: true})
      });

      // если response с кодом отличным от 200
      if (!response.ok) {
        const errorReponse = await response.json();
        throw new Error(errorReponse.error.message);
      }

      const json = await response.json();
      const {token, user} = json.result;

      this.setState({
        ...this.getState(),
        xToken: token,
        isAuthorized: true,
        error: {}
      });

      this.store.get('user').setUser(user);
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        isAuthorized: false,
        error
      });
    }
  }

  async signInWithToken(token) {
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'X-Token': token}
      });
      const json = await response.json();
      const user = json.result.result;

      this.setState({
        ...this.getState(),
        currentUser: user
      });
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        currentUser: {}
      });
    }
  }

  async signOut() {
    const xToken = this.getState().xToken;

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json', 'X-Token': xToken}
      });

      if (!response.ok) {
        const errorReponse = await response.json();
        throw new Error(errorReponse.error.message);
      }
      const json = await response.json();
      const result = json.result;

      // если выход успешный, из api приходит result=true
      if (result) {
        this.setState({
          ...this.getState(),
          xToken: '',
          isAuthorized: false
        });

        // также после уведомления api сбрасываем текущего пользователя
        this.store.get('user').resetUser();
      } else {
        throw Error('There was a problem when sign out');
      }
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        isAuthorized: false,
        error
      });
    }
  }
}

export default Login;
