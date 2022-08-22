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
      user: {
        name: '',
        phone: '',
        email: '',
      },
      error: '',
      isAuth: false,
    };
  }

  /**
   * Авторизация
   */
  async login(payload){

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

      // Пользователь авторизован
      this.setState({
        user: {...this.getState().user, name: json.result.user.profile.name},
        error: '',
        isAuth: true,
      });
      console.log("try: ", response);
    } catch (error){
      // const error = e.error.data ? e.error.data.issues[0].message : e.error.message
      console.log("catch: ", error);
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        error: `${error.message}`
      });
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

        console.log("result: ", response);

        if (response.status == 200) {
          await localStorage.removeItem('token');
    
          // Пользователь разлогинен
          this.setState({
            error: '',
            isAuth: false,
            user: {},
          });
        }
  

      } catch (e){
        this.setState({
          error: '',
          isAuth: false,
          user: {},
        });
      }
    }

    /**
   * Получить данные профиля
   */
  async me(){
    // Сброс текущего товара и установка признака ожидания загрузки
    // this.setState({
    //   waiting: true,
    //   data: {}
    // });

    const token = await localStorage.getItem('token');

    try {
      const response = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Token': token
        }
      });
      const json = await response.json();

      this.setState({
        ...this.getState(),
        user: {
          name: json.result.profile.name,
          phone: json.result.profile.phone,
          email: json.result.email,
        },
        isAuth: true,
    });
    } catch (e){
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        isAuth: false,
      });
    }
  }

}

export default AuthState;
