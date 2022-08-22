import StateModule from "../module";
import api from "../../services/api";
import { getToken, removeToken } from "../../services/token";

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
      name: '',
      phone: '',
      email: ''
    };
  }

  async setData() {
    const res = await api.get('/users/self/');
    
    this.setState({
      name: res.data.result.profile.name,
      phone: res.data.result.profile.phone,
      email: res.data.result.email
    });
  }
  
  resetData() {
    this.setState({
      name: '',
      phone: '',
      email: ''
    });
  }
  
  async logout() {
    await api.delete('/users/sign/', { headers: { "x-token": getToken() } });
    this.resetData();
    removeToken();
  }
}

export default UserState;
