import StateModule from "../module";

/**
 * Авторизация
 */
class Authorization extends StateModule{
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      error: {},
      token: '',
      waiting: false
    };
  }

  /**
   * Авторизация
   */
  async login(login, password){
  
  // Установка признака авторизации
  this.setState({
    ...this.getState(),
    waiting: true
  }, 'Установка признака авторизации');  
    
  try {
    const response = await fetch(`/api/v1/users/sign`, {
      method: 'POST',
      body: JSON.stringify({ login, password }),
      headers: {
        'Content-Type': 'application/json'
      }    
      });
      const json = await response.json();
      if(json.result) {
        // Авторизация прошла успешно
        this.setState({
            error: '',
            token: json.result.token,
            waiting: false
        }, 'Авторизация прошла успешно');
      }
      if(json.error) {
        // Авторизация прошла не успешно
        this.setState({
          error: json.error,
          token: '',
          waiting: false
        }, 'Авторизация прошла не успешно');
      }
  } catch(err) {
      console.log(err)
  } 
}
  
  //повторное получение данных пользователя по токену
  async reLogin(token){

  // Установка признака авторизации
  this.setState({
    ...this.getState(),
    waiting: true
  }, 'Установка признака авторизации');     

  try {
    const response = await fetch(`/api/v1/users/self/`, {
      method: 'GET',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json'
      }    
      });
      const json = await response.json();
      if(json.result) {
        // Авторизация прошла успешно
        this.setState({
            error: '',
            token: token,
            waiting: false
        }, 'Авторизация прошла успешно');
      }
      if(json.error) {
        // Авторизация прошла успешно
        this.setState({
            error: json.error.message,
            token: '',
            waiting: false
        }, 'Плохой токен');
      }
  }  catch(err) {
      if(err.error) {
        // Токен плохой
        // Сбрасывем данные, запоминаем ошубку
          this.setState({
            error: err.error,
            token: '',
            waiting: false
          }, `Ошибка авторизации: ${err.error}`);
      }
  }  
}

  //выход пользователя
  async logOut(token){
      // Установка признака авторизации
      this.setState({
        ...this.getState(),
        waiting: true
      }, 'Установка признака ожидания выхода пользователя');  

    const response = await fetch(`/api/v1/users/sign/`, {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json'
      }    
      });
      const json = await response.json();
      this.setState({
        error: '',
        token: '',
        waiting: false
      }, 'Пользовталь вышел успешно');
  }

  //очистка error
  cleanError(){
    this.setState({
      ...this.getState(),
      error: '',
      waiting: false
    }, 'Очистка ошибка авторизации');
  }

}

export default Authorization;
