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
      const json = await this.services.api.request({
        url: '/api/v1/users/sign',
        method: 'POST',
        body:
          JSON.stringify({
            login: login,
            password: password,
            remember: true
          })
      })
      
      if (json.error) {
        const errors = json.error.data.issues.reduce((previousValue, currentValue) => previousValue + currentValue.message + '. ', '')
        
        this.setState({
          ...this.getState(),
          errorMessage: errors,
          waiting: false
        });
      } else {
        const data = json.result;
        
        this.setState({
          ...this.getState(),
          token: data.token,
          user: data.user,
          errorMessage: '',
          isAuth: true,
          waiting: false
        });
        this.store.api.setHeader('X-Token', data.token)
        localStorage.setItem('authToken', data.token)
      }
    } catch (e) {
      this.setState({
        ...this.getState(),
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
        const json = await this.services.api.request({
          url: "/api/v1/users/self", headers: {
            "X-Token": currentToken,
          },
        });
        
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
    this.setState({
      ...this.getState(),
      waiting: false
    });
  }
  
  async logout() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const currentToken = localStorage.getItem('authToken') || this.getState().token
    if (currentToken) {
      try {
        const json = await this.services.api.request({
          url: "/api/v1/users/sign",
          method: "DELETE"
        });
        
        this.setState({
          ...this.initState()
        });
        localStorage.removeItem("authToken");
      } catch (e) {
        this.setState({
          ...this.getState(),
          waiting: false
        });
      }
    }
  }
}

export default UserState;
