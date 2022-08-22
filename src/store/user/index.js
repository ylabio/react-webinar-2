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
    };
  }

  setName(name) {
    this.setState({
      name
    });
  }
  
  removeName() {
    this.setState({
      name: ''
    });
  }
  
  async logout() {
    await api.delete('/users/sign/', { headers: { "x-token": getToken() } });
    this.removeName();
    removeToken();
  }
}

export default UserState;
