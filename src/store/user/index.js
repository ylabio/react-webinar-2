import StateModule from "../module";

/**
 * Состояние аккаунта пользователя
 */
class UserState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
      logined: false,
      error: ""
    };
  }
 /**
   * Устанвока данных пользователя
   * @param user данные пользователя
   * @param token токен
   * @param logined залогинен ли пользователь
   * @returns {void}
   */
  setUser(user, token, logined) {
    localStorage.setItem("token", token);
    this.setState({
      user: {...user},
      token: token,
      logined: logined
    });
  }
 /**
   * Устанвока отправка логина и пароля на сервер
   * @param login логин
   * @param password пароль
   * @returns {Promise<void>}
   */
  async resetError() {
    this.setState({
      ...this.getState(),
      error: ""
    })
  }
 /**
   * Устанвока отправка логина и пароля на сервер
   * @param login логин
   * @param password пароль
   * @returns {Promise<void>}
   */
  async logIn(login, password) {
    await fetch("/api/v1/users/sign?fields=_id%2Cprofile%28name%29", {method: "POST", body: JSON.stringify({login, password}), headers: {
        'Content-Type': 'application/json'
      }}).then((res) => res.json()).then((res) => {
        if(res.result) this.setUser(res.result.user, res.result.token, true);
        else if(res.error) throw new Error(res.error.data.issues[0].message);
      }).catch((e) => {
        this.setState({
          ...this.getState(),
          error: e.message
        })
      })
  }
 /**
   * Выход из аккаунта
   * @returns {Promise<void>}
   */
  async logOut() {
    await fetch("/api/v1/users/sign?fields=_id%2Cprofile%28name%29", {method: "DELETE", headers: {
        'Content-Type': 'application/json',
        "X-Token": this.getState().token
      }}).then((res) => res.json());

    this.setUser({}, "", false);
  }
 /**
   * Автоматический логин при помощи записанного токена
   * @param token токен
   * @returns {Promise<void>}
   */
  async auth(token) {
    await fetch("/api/v1/users/self?fields=_id%2Cprofile%28name%29", {method: "GET", headers: {
        'Content-Type': 'application/json',
        "X-Token": token
    }}).then((res) => res.json()).then((res) => {
      if(res.result) this.setUser(res.result, token, true)
    });
  }
}

export default UserState;
