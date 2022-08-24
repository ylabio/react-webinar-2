import StateModule from "../module";

class AuthFormState extends StateModule {

  /**
   * Начальное состояние state
   * @returns -
   */
  initState() {
    return {
      token: '',
      authorized: false,
      error: '',
      waiting: false,
      profile: {
        id: '',
        name: '',
        phone: '',
        email: '',
      }
    }
  }
  

  /**
   * Сбрасываем state
   */
  clearState() {
    this.setState({      
      token: '',
      authorized: false,
      waiting: false,
      error: '',
      profile: {
        id: '',
        name: '',
        phone: '',
        email: '',
      }     
    });
  }

  // Очистка сообщения об ошибке
  clearError() {
    this.setState({
      ...this.getState(),
      error: '',
    })
  }

  // Установка авторизации
  setAuthorization(status, token) {
    this.setState({
      ...this.getState(),
      token: token,
      authorized: status,
    })
  }


  /**
   * Запрос на логин пользователя
   * @param {*} param0 - данные из формы (логин и пароль)
   */
  async login({login, password}) {
    // Сбрасываем состояние перед логином
    this.clearState();
    const response = await fetch('/api/v1/users/sign?fields=_id,email,profile(name,phone)', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({login, password, remember: true}),
    });

    if (response.status >= 200 && response.status < 300) {     
      console.log('Login ok');
      const {result} = await response.json();      
        this.setState({
          ...this.getState(),
          token: result.token,
          authorized: true,
          // waiting: false,
          profile: {
            name: result.user.profile.name,
            phone: result.user.profile.phone,
            email: result.user.email,
          }
        });
    } else {      
      console.log('Login error') //! Консоль
      const {error} = await response.json();

      let errorMessage = '';
      for(const issue of error.data.issues) {
        errorMessage += issue.message;
      }
      
      this.setState({
        ...this.getState(),
        error: errorMessage,
        // waiting: false,
      })
    }  
  }

  /**
   * Выход из системы
   * @param {*} token 
   */
  async logout(token) {
    // Сбрасываем state
    const response = await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Token': token,
      },
    });
    const json = await response.json();
    if (json.result) {
      this.clearState();
    }
  }

  /**
   * Получает данные профиля по токену
   * @param {*} token 
   */
  async getProfile(token) {
    console.log('getProfile');
    this.setState({
      ...this.getState(),
      waiting: true,

    });
    const response = await fetch('/api/v1/users/self', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Token': token,
      },
    });
    const json = await response.json();
    if (response.status >=200 && response.status < 300) {     
      const {result} = json
      this.setState({
        ...this.getState(),
        token: token,
        authorized: true,
        waiting: false,
        profile: {
          name: result.profile.name,
          phone: result.profile.phone,
          email: result.email,
        }
      })
    } else {      
      this.setState({      
        token: '',
        authorized: false,
        waiting: false,
        error: json.error.data.issues[0].message,
        profile: {
          id: '',
          name: '',
          phone: '',
          email: '',
        }     
      });
    }   
  }
}

export default AuthFormState;
