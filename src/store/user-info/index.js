import StateModule from "../module";

/**
 * Получение данных о пользователе
 */
class UserInfo extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      dataUser: {},
      waiting: false
    };
  }

  //Получение данных пользователя по токену
  async setUserInfo(token){

  // Установка признака получения данных пользователя
  this.setState({
    ...this.getState(),
    waiting: true
  }, 'Установка признака получения данных о пользователе');     

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
            waiting: false
        }, 'Данные пользователя получены успешно');
      }
    }  catch(err) {
        if(err.error) {
        // Токен плохой
        // Сбрасывем данные, запоминаем ошубку
          this.setState({
            dataUser: {},
            waiting: false
          }, `Ошибка авторизации: ${err.error}`);
      }
    }  
  }
  delUserInfo() {
    // Удаляем данные пользователя
    this.setState({
      dataUser: {},
      waiting: false
    }, 'Данные пользователя успешно удалены');
  }
}

export default UserInfo;
