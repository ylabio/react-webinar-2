import StateModule from "../module";

/**
 * Состояние товара
 */
class AuthState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      userName: '',
      token: '',
      error: '',
      isAuth: false,
    };
  }

  /**
   * Авторизация
   */
  async login(payload){
    // Сброс текущего товара и установка признака ожидания загрузки
    // this.setState({
    //   waiting: true,
    //   data: {}
    // });

    console.log("payload: ", payload);

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const json = await response.json();

      await localStorage.setItem('token', json.result.token);

      console.log("json: ", json);

      // Пользователь авторизован
      this.setState({
        userName: json.result.user.profile.name,
        token: json.result.token,
        error: '',
        isAuth: true,
      });
    } catch (e){
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        ...this.getState(),
        error: `${e}`
      });
      console.log("Error login");
    }
  }

    /**
   * Разлогинивание
   */
     async logout(){

      const token = await localStorage.getItem('token');

      try {
        const response = await fetch('/api/v1/users/sign', {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Token': token
          }
        });
        const json = await response.json();
  
        await localStorage.removeItem('token');
  
        console.log("auth: ", json);
  
        // Пользователь авторизован
        this.setState({
          userName: '',
          token: '',
          error: '',
          isAuth: false,
        });
      } catch (e){
        // Ошибка при загрузке
        // @todo В стейт можно положть информауию об ошибке
        this.setState({
          ...this.getState(),
          error: `${e}`
        });
        console.log("Error logout");
      }
    }

}

export default AuthState;
