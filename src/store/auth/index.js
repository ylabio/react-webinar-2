import StateModule from "../module";

class AuthState extends StateModule{

  initState() {
    return {
      user: {},
      token: localStorage.getItem('token') ?? '',
      waiting: false,
      status: ''
    };
  }


  //получение токена
  async getToken() {
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
        }
        )
        )
    }

  }
  /**
   * выход и удаление токена
   */
  async logOut() {
    fetch("/users/sign",{
      method:"DELETE",
      headers:{
        "X-Token": `${this.getState().token}`
      }
    }
    )   
    .then(response => response.json())
    .then(json => this.setState({
      ...this.getState(),
      user: json["result"],
      waiting: false
    }
    )
    )

    localStorage.removeItem('token')
    this.setState(this.initState())


    
  }
   
  // авторизация
  async Auth(login, password) {
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
          localStorage.setItem('token', json.result.token)
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
