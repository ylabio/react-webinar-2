import StateModule from "../module";

const initialState = {
  name: "",
  login: "",
  email: "",
  phone: "",
  password: "",
  error: "",
  loggedIn: false,
  waiting: false,
  token: "",
};

/**
 * Состояние пользователя
 */
class UserState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return initialState;
  }

  #setWaiting() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
  }

  /**
   * Аутентификация
   */
  async authentication(token) {
    this.#setWaiting();
    const response = await fetch("/api/v1/users/self", {
      headers: { "X-Token": token, "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (json.result) this.setUserData({ user: { ...json.result }, token });
  }

  async setUserData(userData) {
    this.setState({
      ...this.getState(),
      token: userData.token,
      loggedIn: true,
      name: userData.user.profile.name,
      phone: userData.user.profile.phone,
      email: userData.user.email,
      error: "",
      waiting: false,
    });
  }

  async handleChangeLogin(form) {
    this.setState({
      ...this.getState(),
      ...form,
    });
  }

  async login() {
    this.#setWaiting();
    const { login, password } = this.getState();
    const response = await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    });
    const json = await response.json();
    if (json.result) {
      localStorage.setItem("ylabToken", json.result.token);
      this.setUserData(json.result);
      history.back();
    }
    if (json.error) {
      console.log(json.error);
      this.setState({
        ...this.getState(),
        error: json.error.message,
      });
    }
  }

  async logOut() {
    this.#setWaiting();
    const response = await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: { "X-Token": this.getState().token, "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (json.result) {
      localStorage.removeItem("ylabToken");
      this.setState({ ...this.getState(), ...initialState });
    }
    this.setState({
      ...this.getState(),
      waiting: false,
    });
  }
}

export default UserState;
