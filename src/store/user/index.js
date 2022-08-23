import StateModule from "../module";

/**
 * Состояние товара
 */
class UserState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      login:'',
      password:''
    };
  }

  async getUser(token){
    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: "GET",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      
      this.setState({
        ...this.getState(),
        ...json.result,
        token
      });
    } catch(e) {
    console.log(e);
   }
  }

  setLogin(e){
    this.setState({
    ...this.getState(),
    login: e,
    loginError: ''
    });
  }

  setPassword(e){
    this.setState({
    ...this.getState(),
    password: e,
    loginError: ''
    });
  }
  setLogOut(){
    this.setState(this.initState());
    localStorage.removeItem('token');
  }
}

export default UserState;