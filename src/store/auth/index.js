import StateModule from "../module";

/**
 * Состояние авторизации
 */
class AuthState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      isLogin: false,
      waiting: false,
      user: {
        username: '',
        profile: {}
      },
      errorMessage: null,
    };
  }

  /**
   * Устанвока параметров и загрузка списка товаров
   *@param login
   *@param password
   * @returns {Promise<void>}
   */
  async sigIn(login, password) {
    const user = {
      login, password
    }

    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });
      const json = await response.json();
      if (json.error) {
        this.setState({
          ...this.getState(),
          errorMessage: json.error.data.issues[0].message,
          waiting: false
        });
      }
      if (json.result) {
        const {user, token} = json.result
        localStorage.setItem('user_secret', JSON.stringify(token));
        this.setState({
          ...this.getState(),
          isLogin: true,
          user,
          token,
          waiting: false
        });
      }
    } catch (e) {
    }
  }

  /**
   * Запрос на проверку авторизации
   * @returns {Promise<void>}
   */
  async self() {

    try {
      const temp = localStorage.getItem('user_secret');
      const token = temp && JSON.parse(temp);
      const response = await fetch(`/api/v1/users/self`, {
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();

      if (json.result.error) {
      }
      if (!json.result.error) {
        this.setState({
          ...this.getState(),
          isLogin: true,
          user: json.result,
          waiting: false
        });
      }
    } catch (e) {
    }
  }

  /**
   * Запрос на проверку авторизации
   * @returns {Promise<void>}
   */
  async logout() {

    try {
      const temp = localStorage.getItem('user_secret');
      const token = temp && JSON.parse(temp);
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json'
        },
      });
      const json = await response.json();
      if (json.result) {

        this.setState({
          ...this.getState(),
          isLogin: false,
          user: {},
          waiting: false
        });
        localStorage.removeItem('user_secret');
      }
    } catch (e) {
    }
  }
}

export default AuthState;
