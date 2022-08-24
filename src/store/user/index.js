import StateModule from "../module";

/**
 * Состояние аккаунта
 */
class UserState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
   initState() {
    return {
      user: [],
      token: localStorage.getItem('token') || '',
      error: '',
      userExists: false,
      waiting: false,
    };
  }

  /**
   * Вход в аккаунт
   */
  async logIn (login, password){
    this.setState({
      ...this.getState(),
      waiting: true
    });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login: login,
          password: password,
        }),
      });
      const json = await response.json();
      if (json.error) {
        this.setState({
          user: [],
          token: '',
          error: json.error.data.issues[0].message,
          userExists: false,
          waiting: false
        }, 'Ошибка входа в аккаунт');
      }
      else {
        localStorage.setItem('token', json.result.token);
        this.setState({
          user: json.result.user,
          token: json.result.token,
          error: '',
          userExists: true,
          waiting: false
        }, 'Вход в аккаунт');
      }
    } catch (e){
      console.log(e);
      this.setState({
        error: 'Некая ошибка от сервера',
        user: [],
        token: '',
        userExists: false,
        waiting: false
      }, 'Ошибка');
    }
  }

  /**
   * Выход из аккаунта
   */
  async logOut() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    const token = this.getState().token;
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
        },
      });
      localStorage.removeItem('token');
      this.setState({
        user: [],
        token: '',
        error: '',
        userExists: false,
        waiting: false,
      }, 'Выход из аккаунта');
    } catch (e) {
      console.log(e);
      this.setState({
        error: 'Некая ошибка от сервера',
        user: [],
        token: '',
        userExists: false,
        waiting: false
      }, 'Ошибка');
    }
  }

  /**
   * Загрузка аккаунта
   */
  async load(){
    const token = this.getState().token;
    if(token){
      this.setState({
        ...this.getState(),
        waiting: true
      });
      try {
        const response = await fetch('/api/v1/users/self', {
          method: 'GET',
          headers: {
            'X-Token': token,
          },
        });
        const json = await response.json();
        if (!json.error) {
          this.setState({
            user: json.result,
            error: '',
            userExists: true,
            waiting: false
          }, 'Вход в аккаунт с токена');
        }
        else {
          localStorage.removeItem('token');
          this.setState({
            ...this.getState(),
            token: '',
            userExists: false,
            waiting: false
          }, 'Токен просрочен')
        }
      } catch (e){
        this.setState({
          error: 'Некая ошибка от сервера',
          user: [],
          token: '',
          userExists: false,
          waiting: false
        }, 'Ошибка');
      }
    }
  }

  removeError() {
    this.setState({
      ...this.getState(),
      error: ''
    });
  }
}

export default UserState;
