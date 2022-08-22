import StateModule from "../module";

/**
 * Состояние пользователя
 */
class UserState extends StateModule {
  
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: '',
      user: {},
      errorMessage: '',
      isAuth: false,
      waiting: false,
    };
  }
  
  async login(login, password) {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login: login,
          password: password,
          remember: true
        })
      })
      
      const json = await response.json()
      const data = json.result;

      this.setState({
        ...this.getState(),
        token: data.token,
        user: data.user,
        errorMessage: '',
        isAuth: true,
        waiting: false
      });
      localStorage.setItem('authToken', data.token)
    } catch (e) {
      this.setState({
        ...this.getState(),
        errorMessage: 'Некая ошибка от сервера',
        waiting: false
      });
    }
  }
  
  async getUserProfile() {
    
    this.setState({
      ...this.getState(),
      waiting: true
    });
    
    const currentToken = localStorage.getItem('authToken')
    if (currentToken) {
      try {
        const response = await fetch("/api/v1/users/self", {
          method: "GET",
          headers: {
            "X-Token": currentToken,
          },
        });
        
        const json = await response.json()
        const data = json.result;

        this.setState({
          ...this.getState(),
          user: data,
          errorMessage: '',
          isAuth: true,
          waiting: false
        });
      } catch (e) {
        this.setState({
          ...this.initState(),
        });
      }
    }
  }
  
  async logout() {
    const currentToken = localStorage.getItem('authToken') || this.getState().token
    
    if (currentToken) {
      try {
        const response = await fetch("/api/v1/users/sign", {
          method: "DELETE",
          headers: {
            "X-Token": currentToken,
            "Content-Type": "application/json"
          },
        });
        const json = await response.json

        this.setState({
          ...this.initState()
        });
        localStorage.removeItem("authToken");
      } catch (e) {
        this.setState({
          ...this.getState(),
          errorMessage: 'Некая ошибка от сервера'
        });
      }
    }
  }
}

export default UserState;
