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
      dataUser: {},
      error: {}
    };
  }

  /**
   * Авторизация
   */
  async login(login, password){
    
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
            dataUser: json.result.user,
            error: ''
        });
      }
      if(json.error) {
        // Авторизация прошла не успешно
        this.setState({
          dataUser: {},
          error: json.error
        });
      }
  } catch(err) {
      console.log(err)
  } 
}
  
  //повторное получение данных пользователя по токену
  async reLogin(token){

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
            dataUser: json.result,
            error: ''
        });
      }
  }  catch(err) {
      if(err.error) {
        // Токен плохой
        // Сбрасывем данные, запоминаем ошубку
          this.setState({
            dataUser: {},
            error: err.error
          });
      }
  }  
}

  //выход пользователя
  async logOut(token){

    const response = await fetch(`/api/v1/users/sign/`, {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json'
      }    
      });
      const json = await response.json();
      if(json.result) {
        // выход успешен
        this.setState({
            dataUser: {},
            error: ''
        });
      }
  }

}

export default Authorization;
