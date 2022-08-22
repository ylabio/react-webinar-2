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
      error: '',
      name: '',
      info: {
        email: '',
        profile: {
          name: '',
          phone: '',
        }
      }
    };
  }

  async authorize(data){
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const res = await getToken(data);
      debugger
      setCookie('token', res.result.token);

      this.setState({
        ...this.getState(),
        waiting: false,
        name: res.result.user.profile.name,
        error: '',
      });

      localStorage.setItem('name', res.result.user.profile.name);

    } catch (e) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: e.error.data.issues[0].message,
      });

      throw e;
    }
  }

  async logout(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    await deleteToken(token);
    setCookie('token', '');
    localStorage.setItem('name', '');

    this.setState({
      ...this.getState(),
      waiting: false,
      name: '',
    });
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
        info: res.result
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
