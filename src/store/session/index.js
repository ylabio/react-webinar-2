import StateModule from "../module";
import simplifyErrors from "../../utils/simplify-errors";

/**
 * Сессия
 */
class SessionState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: null,
      errors: null,
      exists: false,
      waiting: true
    };
  }

  /**
   * Авторизация (вход)
   * @param data
   * @param onSuccess
   * @returns {Promise<void>}
   */
  async signIn(data, onSuccess) {
    this.setState(this.initState(), 'Авторизация (начало)');
    try {
      const json = await this.services.api.request({
        method: 'POST',
        url: '/api/v1/users/sign',
        body: JSON.stringify(data)
      });
      if (json.error) {
        this.setState({
          ...this.getState(),
          errors: simplifyErrors(json.error.data.issues),
          waiting: false
        }, 'Ошибка авторизации');
      } else {
        this.setState({
          ...this.getState(),
          token: json.result.token,
          user: json.result.user,
          exists: true,
          waiting: false
        }, 'Успешная авторизация');

        // Запоминаем токен, чтобы потом автоматически аутентифицировать юзера
        window.localStorage.setItem('token', json.result.token);
        // Устанавливаем токен в АПИ
        this.services.api.setHeader(this.config.tokenHeader, json.result.token);

        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Отмена авторизации (выход)
   * @returns {Promise<void>}
   */
  async signOut() {
    try {
      await this.services.api.request({method: 'DELETE', url: '/api/v1/users/sign'});
      this.services.api.setHeader(this.config.tokenHeader, null);
    } catch (error) {
      console.error(error);
    }
    this.setState({...this.initState(), waiting: false});
  }

  /**
   * По токену восстановление сессии
   * @return {Promise<void>}
   */
  async remind() {
    const token = localStorage.getItem('token');
    if (token) {
      // Устанавливаем токен в АПИ
      this.services.api.setHeader(this.config.tokenHeader, token);
      const json = await this.services.api.request({url: '/api/v1/users/self'});
      if (json.error) {
        // Удаляем плохой токен
        window.localStorage.removeItem('token');
        this.services.api.setHeader(this.config.tokenHeader, null);
      } else {
        this.setState({
          ...this.getState(),
          token: token,
          user: json.result,
          exists: true,
          waiting: false
        }, 'Успешно вспомнили сессию');
      }
    } else {
      this.setState({
        ...this.getState(),
        exists: false,
        waiting: false
      }, 'Сессии нет');
    }
  }
}

export default SessionState;
