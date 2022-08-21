import StateModule from "../module";

/**
 * Состояние авторизации пользователя
 */
class AuthorisationState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      token: null,
      authorisedUser: '',
      waiting: false,
      error: null,
      data: {},
    };
  }

  /**
   * Проверка токена
   */
  async checkAuthorisation(){
    const token = localStorage.getItem('token');
    if (!token) return;

    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: "GET",
        headers: {
          "X-Token": token,
        },
      });
      const json = await response.json();

      if (json.error) {
        throw new Error(`${json.error.message} (${json.error.data.issues[0].message || ''})`);
      }

      this.setState({
        token,
        authorisedUser: json.result.profile.name,
        waiting: false,
        error: null,
        data: {
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email,
        },
      });
    } catch (error){
      localStorage.removeItem("token");

      this.setState({
        token: null,
        authorisedUser: '',
        waiting: false,
        error: error.message,
        data: {},
      });
    }
  }

  /**
   * Вход
   */
  async login(login, password){
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password:  password,
          login: login
        }),
      });

      const json = await response.json();

      if (json.error) {
        throw new Error(`${json.error.message} (${json.error.data.issues[0].message || ''})`);
      }

      localStorage.setItem("token", json.result.token);

      this.setState({
        token: localStorage.getItem('token'),
        authorisedUser: json.result.user.profile.name,
        waiting: false,
        error: null,
        data: {
          name: json.result.user.profile.name,
          phone: json.result.user.profile.phone,
          email: json.result.user.email,
        }
      });

      history.back();

    } catch (error){
      this.setState({
        token: null,
        authorisedUser: '',
        waiting: false,
        error: error.message,
        data: {},
      });
    }
  }

  /**
   * Выход
   */
  async logout(){
    const token = localStorage.getItem('token');

    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': `${token}`
        },
      });

      const json = await response.json();

      if (json.error) {
        throw new Error(`${json.error.message} (${json.error.data.issues[0].message || ''})`);
      }

      localStorage.removeItem("token");

      this.setState({
        token: null,
        authorisedUser: '',
        waiting: false,
        error: null,
        data: {},
      });
    } catch (error){
      localStorage.removeItem("token");

      this.setState({
        token: null,
        authorisedUser: '',
        waiting: false,
        error: error.message,
        data: {},
      });
    }
  }
}

export default AuthorisationState;
