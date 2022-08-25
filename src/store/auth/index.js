import StateModule from "../module";

/**
 * Состояние авторизации
 */
class AuthState extends StateModule{
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
   * Запись данных авторизации
   * @param name Имя пользователя
   * @param token Токен
   * @param isLogin Флаг логина
   * @returns {void}
   */
  setAuth(name, token, isLogin) {
    localStorage.setItem("token", token);
    this.setState({
      name: name,
      token: token,
      isLogin: isLogin
    });
  }
  /**
   * Вход
   * @param login логин
   * @param password пароль
   * @returns {Promise<void>}
   */
  async sign(login, password) {
    await fetch("/api/v1/users/sign", {
      method: "POST",
      body: JSON.stringify({login, password}),
      headers: {
        'Content-Type': 'application/json'
      }})
      .then(res => res.json())
      .then(res => {
      if(res.result) this.setAuth(res.result.user.profile.name, res.result.token, true);
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
  async signout() {
    await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "X-Token": this.getState().token
      }})
      .then(res => res.json());
    this.setAuth({}, "", false);
  }
  /**
   * Авторизация по токену
   * @param token токен
   * @returns {Promise<void>}
   */
  async self(token) {
    await fetch("/api/v1/users/self", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "X-Token": token
      }})
      .then(res => res.json())
      .then(res => {
        if(res.result) this.setAuth(res.result.profile.name, token, true)
      });
  }
}

export default AuthState;