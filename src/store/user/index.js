import StateModule from "../module";
import {postData} from "../../utils/post-data";

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
      email: null,
      login:'',
      password:'',
      profile: {
        name: null,
        phone: null
      }
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

  async setLogOut(){
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: "DELETE",
        headers: {
          "X-Token": token,
          "Content-Type": "application/json",
        },
      });
    } catch(e) {
    console.log(e);
    }
    localStorage.removeItem('token');
    this.setState(this.initState());
  }

  async getLogIn(){
    try{
      postData('/api/v1/users/sign', {
        login: this.getState().login, 
        password: this.getState().password
      })
      .then((res)=>{
        if (res.error) this.store.setState({
          ...this.store.getState(),
          user: {
            loginError: res.error.data.issues[0].message,
            login: '',
            password: ''
        }});
        else {this.store.setState({
          ...this.store.getState(),
          user: {
            loginError: '',
            login: '',
            password: '',
            ...res.result.user,
            token: res.result.token
          }
        });
        localStorage.setItem('token', res.result.token);
        }
      });
    } catch(e) {
      console.log(e);
    }
  }
}

export default UserState;
