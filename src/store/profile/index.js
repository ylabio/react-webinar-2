import StateModule from "../module";

/**
 * Состояние профиля
 */
class ProfileState extends StateModule{
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
      isLogin: false,
      error: ""
    };
  }
  /**
   * Устанвока данных пользователя
   * @param user Данные пользователя
   * @param token Токен
   * @param isLogin Флаг логина
   * @returns {void}
   */
  setUser(user, token, isLogin) {
    localStorage.setItem("token", token);
    this.setState({
      user: {...user},
      token: token,
      isLogin: isLogin
    });
  }
  /**
   * Авторизация
   * @param login логин
   * @param password пароль
   * @returns {Promise<void>}
   */
  async login(login, password) {
    await fetch("/api/v1/users/sign", {
      method: "POST",
      body: JSON.stringify({login, password}),
      headers: {
        'Content-Type': 'application/json'
      }})
      .then(res => res.json())
      .then(res => {
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
   * Выход
   * @returns {Promise<void>}
   */
  async logout() {
    await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "X-Token": this.getState().token
      }})
      .then(res => res.json());
    this.setUser({}, "", false);
  }
  /**
   * Автоматическая авторизация по токену
   * @param token токен
   * @returns {Promise<void>}
   */
  async auth(token) {
    await fetch("/api/v1/users/self", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "X-Token": token
      }})
      .then(res => res.json())
      .then(res => {
        if(res.result) this.setUser(res.result, token, true)
      });
  }
}

export default ProfileState;