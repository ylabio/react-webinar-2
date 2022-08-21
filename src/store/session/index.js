import StateModule from "../module";
import simplifyErrors from "../../utils/simplify-errors";

/**
 * Сессия
 */
class SessionState extends StateModule{
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
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      });
      const json = await res.json();

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
        if (onSuccess) onSuccess();
      }
    } catch(error) {
      console.error(error);
    }
  }

  /**
   * Отмена авторизации (выход)
   * @returns {Promise<void>}
   */
  async signOut() {
    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': this.getState().token
        }
      });
      window.localStorage.removeItem('token');
    } catch(error) {
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
      const res = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        },
      });
      const json = await res.json();

      if (json.error) {
        // Удаляем плохой токен
        window.localStorage.setItem('token', json.result.token);
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
