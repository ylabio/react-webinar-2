import StateModule from '../module';

/**
 * Состояние при процедуре авторизации
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

  /**
   * Авторизация пользователя с логином и паролем
   * @param {string} login
   * @param {string} password
   */
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

      // запись token в localStorage
      localStorage.setItem('xToken', token);

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

  /**
   * Получение текущего пользователя через токен, стрелочная функция применяется для связывания this
   * @param {string} token
   */
  signInWithToken = async token => {
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', 'X-Token': token}
      });
      const json = await response.json();
      const user = json.result;

      this.setState({
        ...this.getState(),
        xToken: token,
        isAuthorized: true,
        error: {}
      });

      // запись user в модуль состояния user
      this.store.get('user').setUser(user);
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        isAuthorized: false,
        error
      });
    }
  };

  /**
   * Выход пользователя, сброс авторизации текущего пользователя
   */
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

        // и удаляем запись tokena из localStorage
        localStorage.removeItem('xToken');
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
