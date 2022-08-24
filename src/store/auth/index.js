import StateModule from "../module";

class AuthState extends StateModule {
  initState() {
    return {
      token: localStorage.getItem("token"),
      is_token_valid: false,
    };
  }

  async login(user_login, password, nav_function = () => {}) {
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login: user_login, password }),
      });
      const json = await response.json();
      if (!json.error) {
        localStorage.setItem("token", json.result.token);

        this.setState({
          token: json.result.token,
          is_token_valid: true,
        });
        nav_function();
        return ""; // сообщение без ошибки
      } else {
        this.setState({
          token: "",
          is_token_valid: false,
        });
        return json.error.data.issues[0].message; //сообщение с ошибкой
      }
    } catch (e) {
      console.log(e.message);
    }
  }

  async logout(nav_function = () => {}) {
    try {
      const response = await fetch("/api/v1/users/sign", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.getState().token,
        },
      });
      const json = await response.json();
      localStorage.removeItem("token");
      this.setState({
        token: "",
        is_token_valid: false,
      });
      nav_function();
    } catch (e) {
      console.log(e.message);
    }
  }

  setTokenValidity(value) {
    this.setState({ ...this.getState(), is_token_valid: value });
  }
}

export default AuthState;
