import { deleteToken, getToken } from "../../service/auth";
import { getUserInfo } from "../../service/user";
import { setCookie } from "../../utils/coockie";
import StateModule from "../module";

class AuthorizeState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      error: '',
    };
  }

  async authorize(data){
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const res = await getToken(data);

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

  async sessionCheck(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const res = await getUserInfo(token);
      this.setState({
        ...this.getState(),
        waiting: false,
        name: res.result.profile.name,
      });
    } catch (error) {
      setCookie('token', '');
      this.setState({
        ...this.getState(),
        waiting: false,
      });
      throw error
    }
  }
}

export default AuthorizeState;
