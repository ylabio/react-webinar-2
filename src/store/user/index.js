import StateModule from "../module";

/**
 * Состояние товара
 */
class UserState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      name: "",
      phone: "",
      email: "",
      token: "",
      error: "",
    };
  }

  async authorization(login, password) {
    const response = await fetch("/api/v1/users/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });
    const json = await response.json();

    if (response.status >= 400) {
      this.setState({
        error: json.error.data.issues[0].message,
      });
    } else {
      localStorage.setItem("token", json.result.token);

      this.setState({
        name: json.result.user.username,
        token: json.result.token,
        error: "",
      });
    }
  }
  async getUser() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch("/api/v1/users/self", {
        method: "GET",
        headers: {
          "X-Token": String(token),
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      this.setState({
        ...this.store.state.user,
        name: json.result.username,
        phone: json.result.profile.phone,
        email: json.result.email,
      });
    } catch (error) {
      console.log(error);
      console.log("Ошибка getUser");
    }
  }
  async exit() {
    try {
      const token = localStorage.getItem("token");

      await fetch("/api/v1/users/sign", {
        method: "DELETE",
        headers: {
          "X-Token": String(token),
          "Content-Type": "application/json",
        },
      });

      localStorage.clear();

      this.setState({
        name: "",
        phone: "",
        email: "",
        token: "",
      });
    } catch (error) {
      console.log("Ошибка exit");
    }
  }
}

export default UserState;
