import StateModule from "../module";
import axios from 'axios';
import Cookies from 'js-cookie'

/**
 * Состояние корзины
 */

class AuthState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      profile: {},
      isAuth: false,
      token: Cookies.get('token'),
      me: {},
      waiting:null
    };
  }

  async auth(login, password) {
    const response = await axios.post(`/api/v1/users/sign`, { login, password });
    this.setState({
      ...this.getState(),
      token: Cookies.set('token', response.data.result.token),
      profile: response.data.result.user,
      isAuth:true
    })
    
    
  }

  async me() {
    const response = await axios.get(`/api/v1/users/self`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': this.getState().token
        }
      }
    );
    this.setState({
      ...this.getState(),
      isAuth:true,
      profile: response.data.result,
    })
    setTimeout(() => {
      this.setState({
        ...this.getState(),      
        waiting:true
      })
    }, 1000);
    
  }

  async logout() {
    await axios.delete(`/api/v1/users/sign`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': Cookies.get('token')
        }
      }
    );
    Cookies.remove('token', { path: '' })

    this.setState({
      ...this.getState(),
      isAuth:false,
      profile:{}
    })
  }

}

export default AuthState;
