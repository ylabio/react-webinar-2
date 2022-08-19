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
      token: localStorage.getItem('244sinfallStoreToken') ?? '',
      waiting: false,
      status: ''
    };
  }
  /**
   * Восстановить авторизацию по токену из локального хранилища
   */
  async getSelf() {
    if(this.getState().token) {
      this.setState({
        ...this.getState(),
        waiting: true
      })
      fetch("/api/v1/users/self", {
        method: "GET",
        headers: {
          "X-Token": `${this.getState().token}`
        }
      })
        .then(response => response.json())
        .then(json => this.setState({
          ...this.getState(),
          user: json["result"],
          waiting: false
        }))
    }

  }
  /**
   * Закрыть сессию и удалить токен из локального хранилища
   */
  async logOut() {
    localStorage.removeItem('244sinfallStoreToken')
    this.setState(this.initState())
  }
  /**
   * Сделать попытку авторизации
   * @param login - имя пользователя
   * @param password - пароль
   */
  async pushAuth(login, password) {
    console.log(JSON.stringify({login: login, password: password, remember: true}))
    this.setState({
      waiting: true,
      user: {},
      status: "",
      token: ''
    })
    fetch("/api/v1/users/sign", {
      method: "POST",
      body: JSON.stringify({login: login, password: password, remember: true}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(json => {
        if(!json["error"]) {
          localStorage.setItem('244sinfallStoreToken', json.result.token)
          this.setState({
            user: json.result.user,
            token: json.result.token,
            status: "",
            waiting: false
          })
        } else {
          throw Error(json["error"]["message"])
        }
      })
      .catch((e) => {
        this.setState({
          ...this.getState(),
          status: e.message,
          waiting: false
        })
      })
  }
}

export default AuthState;
