import StateModule from "../module";


class AuthState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: '',
      error: '',
      isLogin: false,
      waiting: false
    };
  }

  async login(login, password) {
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
        headers: { "Content-Type": "application/json" }
      });
      const json = await response.json();
      this.setState({
        ...this.getState(),
        token: json.result.token,
        isLogin: true,
        user: json.result.user,
        error: '',
      })
      localStorage.setItem("token", json.result.token);
      localStorage.setItem("userName", json.result.user.profile.name);
      console.log(localStorage.setItem("token", json.result.token))
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: 'Ошибка',
      })
    }
  }

  async loadProfile() {
    const token = localStorage.getItem("token");
    this.setState({
      ...this.getState(),
      waiting: true
    })

    const response = await fetch(`/api/v1/users/self`, {
      method: 'GET',
      headers: { 'X-Token': token, "Content-Type": "application/json" }
    });
    const json = await response.json();
    this.setState({
      ...this.getState(),
      token: token,
      user: json.result,
      isLogin: true,
      waiting: false
    })
  }
  

  async logout(token) {
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'DELETE',
      headers: { 'X-Token': token, 'Content-Type': 'application/json' }
    });
    const json = await response.json();
    this.setState({
      ...this.getState(),
      token: '',
      name: '',
      user: {},
      isLogin: false
    })
    localStorage.removeItem("token");
    localStorage.removeItem("userName");

  }
}


export default AuthState;
