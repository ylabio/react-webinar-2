import StateModule from "../module";

/**
 * Состояние авторизации
 */
class UserState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
   initState() {
    return {
      user: {},
      token: "",
      isLogged: false,
    }

  }

  async authorize(login, password) {
    return await fetch(`/api/v1/users/sign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          this.setState({
            user: data.result.user,
            token: data.result.token,
            isLogged: true,
          })
        }
        return data
      })
  }

  async unAuthorize(token) {
    return await fetch(`/api/v1/users/sign`, {
      method: "DELETE",
      headers: {
        "X-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          this.setState({
            user: "",
            token: "",
            isLogged: false,
          })
        }
        return data;
      })
  }

  async checkToken(token) {
    return await fetch(`/api/v1/users/self`, {
      method: "GET",
      headers: {
        "X-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          this.setState({
            user: data.result,
            token: token,
            isLogged: true,
          })
        }
        return data
      })
  }


}

export default UserState;
