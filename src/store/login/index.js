import axios from 'axios';
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
      error: {},
      waiting: true
    };
  }

  /**
   * Авторизация пользователя с логином и паролем
   * @param {string} login
   * @param {string} password
   */
  async signIn(login, password) {
    try {
      const response = await axios.post(`/api/v1/users/sign`, {
        login,
        password,
        remember: true
      });

      const {token, user} = response.data.result;

      this.setState({
        ...this.getState(),
        xToken: token,
        isAuthorized: true,
        error: {},
        waiting: false
      });

      // запись token в localStorage
      localStorage.setItem('xToken', token);

      // назначение текущего пользователя
      this.store.get('user').setUser(user);
    } catch (error) {
      // Ошибка при загрузке
      console.log(error);
      this.setState({
        ...this.getState(),
        isAuthorized: false,
        error,
        waiting: false
      });
    }
  }

  /**
   * Получение текущего пользователя через токен, стрелочная функция применяется для связывания this
   * @param {string} token
   */
  signInWithToken = async token => {
    // загрузка текущего пользователя по токену началась
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await axios.get(`/api/v1/users/self`, {
        headers: {'Content-Type': 'application/json', 'X-Token': token}
      });

      const user = response.data.result;

      this.setState({
        ...this.getState(),
        xToken: token,
        isAuthorized: true,
        error: {},
        waiting: false
      });

      // запись user в модуль состояния user
      this.store.get('user').setUser(user);
    } catch (error) {
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        isAuthorized: false,
        error,
        waiting: false
      });
    }
  };

  /**
   * Выход пользователя, сброс авторизации текущего пользователя
   */
  async signOut() {
    const xToken = this.getState().xToken;

    try {
      const response = await axios.delete(`/api/v1/users/sign`, {
        headers: {'Content-Type': 'application/json', 'X-Token': xToken}
      });

      const {result} = response.data;

      // если выход успешный, из api приходит result=true
      if (result) {
        this.setState({
          ...this.getState(),
          xToken: '',
          isAuthorized: false,
          waiting: false
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
        error,
        waiting: false
      });
    }
  }
}

// TODO: много повторяющегося кода, использовать axios или вынести fetch в отдельную функцию обработки

export default Login;
