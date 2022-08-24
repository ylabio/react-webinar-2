import StateModule from "../module";

/**
 * состоние формы
 */
class FormInfo extends StateModule{

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

  //очистка error
  cleanError(){
    this.setState({
      ...this.getState(),
      error: '',
      waiting: false
    }, 'Очистка ошибки авторизации');
  }
}

export default FormInfo;
