import StateModule from "../module";

class AuthState extends StateModule {
  initState() {
    return {
      username: localStorage.getItem("username"),
      token: localStorage.getItem("token"),
      error_message: "",
    };
  }

  async login(login, password) {
    try {
      const response = await fetch("/users/sign", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const json = await response.json();
      console.log(json);
    } catch (e) {
      this.setState({ ...this.getState(), error_message: e.message });
    }
  }

  async logout() {
    try {
      const response = await fetch("/users/sign", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "X-Token": this.getState().token,
        },
      });
      const json = await response.json();
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      this.setState({ username: "", token: "" });
      //   console.log(json);
    } catch (e) {
      this.setState({ ...this.getState(), error_message: e.message });
    }
  }
}

export default AuthState;
