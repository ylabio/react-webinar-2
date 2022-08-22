import StateModule from "../module";

class AuthState extends StateModule {
  initState() {
    return {
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token"),
      error_message: "",
      extra_data: {
        phone: "",
        email: "",
      },
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
        localStorage.setItem("username", json.result.user.profile.name);
        localStorage.setItem("token", json.result.token);

        this.setState({
          username: json.result.user.profile.name,
          token: json.result.token,
          error_message: "",
        });
        nav_function();
      } else {
        this.setState({
          ...this.getState(),
          error_message: json.error.message,
        });
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
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      this.setState({ username: "", token: "", error_message: "" });
      nav_function();
    } catch (e) {
      console.log(e.message);
    }
  }

  async getProfile() {
    try {
      const response = await fetch("/api/v1/users/self", {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.getState().token,
        },
      });
      const json = await response.json();
      // console.log(json);
      this.setState({
        ...this.getState(),
        extra_data: {
          phone: json.result.profile.phone,
          email: json.result.email,
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  }
}

export default AuthState;
