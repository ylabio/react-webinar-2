import { deleteToken, getToken } from "../../service/auth";
import { getUserInfo } from "../../service/user";
import { getCookie, setCookie } from "../../utils/coockie";
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

    const res = await getToken(data);

    if(res.error) {
      this.setState({
        ...this.getState(),
        waiting: false,
        error: res.error.data.issues[0].message,
      });
      return;
    }

    setCookie('token', res.result.token);

    this.setState({
      ...this.getState(),
      waiting: false,
      name: res.result.user.profile.name,
    });
    localStorage.setItem('name', res.result.user.profile.name)
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
    });
  }

  async getInfo(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    const res = await getUserInfo(token);

    if(res.error) {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
      return;
    }

    this.setState({
      ...this.getState(),
      waiting: false,
      info: res.result
    });
  }
}

export default UserState;
