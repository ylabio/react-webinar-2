import { deleteToken, getToken } from "../../service/auth";
import { getUserInfo } from "../../service/user";
import { setCookie } from "../../utils/coockie";
import StateModule from "../module";

class UserState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      info: {
        email: '',
        profile: {
          name: '',
          phone: '',
        }
      }
    };
  }

  async getInfo(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const res = await getUserInfo(token);

      this.setState({
        ...this.getState(),
        waiting: false,
        info: res.result,
      });
    } catch (error) {
        this.setState({
          ...this.getState(),
          waiting: false,
        });
    }
  }
}

export default UserState;
