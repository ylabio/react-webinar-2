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
}

export default UserState;