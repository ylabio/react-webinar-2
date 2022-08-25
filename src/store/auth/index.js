import StateModule from "../module";

/**
 * Авторизация
 */
class AuthState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      login: '',
      password: '',
      user: {}, 
      token: localStorage.getItem('token'),
      error: '',
      isAuth: false,
      waiting: false,
      isAuthAttempt: false
    };
  }

  /**
   * Выбор текущего пользователя
   * 
   */
  async load() {
  
    this.setState({
      ...this.getState(),
      waiting: true,
      error: ''
    })

    const res = await fetch(`/api/v1/users/self`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Token': this.getState().token
      }
    })

    const json = await res.json();

    this.setState({
      ...this.getState(),
      waiting: false
    })

    if (json) {
      this.setState({
        ...this.getState(),
        user: json.result,
        isAuth: true
      }, 'Выбор текущего пользователя')
    }  
  }

  /**
   * Вход в профиль
   * 
   */
  async login() {

    this.setState({
      ...this.getState(),
      waiting: true
    })

    try {
      const res = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        login: this.getState().login,
        password: this.getState().password,
        remember: true
        })
   
    });
  
      const json = await res.json();
        if (json.error) {
          console.log(json.error)
          throw new Error(`${json.error.message}: ${json.error.data.issues[0].message}`);
        }

      this.setState({
        ...this.getState(),
        error: '',
        user: json.result.user,
        token: json.result.token,
        isAuth: true,
        waiting: false,
        isAuthAttempt: false
      }, 'Вход в профиль')
    
      localStorage.setItem('token', json.result.token);

    } catch (err) {
        this.setState({
          ...this.getState(),
          waiting: false,
          error: err.message,
          isAuthAttempt: false
      }, 'Ошибка при входе в профиль')
    }

  }

  /**
   * Выход из профиля
   * @param token Токен пользователя
   */
  async logout(token) {
      
    this.setState({
      ...this.getState(),
      waiting: true,
      isAuthAttempt: false
    })

    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json'
      }
    });
    
    localStorage.removeItem('token');
    
    this.setState({
      login: '',
      password: '',
      user: {}, 
      token: '',
      error: '',
      isAuth: false,
      waiting: false,
      isAuthAttempt: false
    }, 'Выход из профиля')  
  }

  /**
   * Попытка авторизации
   * @param login  Логин
   * @param password Пароль
   */
  authAttempt(login, password) {
    this.setState({
      ...this.getState(),
      login,
      password,
      isAuthAttempt: true,

    }, 'Попытка авторизации') 
  }

  deleteError(){
    this.setState({
      ...this.getState(),
      error: ''
    }, 'Сброс ошибки отправки формы при переходе на другую страницу') 
  }

}

export default AuthState;
