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
      waiting: false,
    };
  }

  /**
   * Авторизация
   */
  async login(payload){
    // Установка признака загрузки
    this.setState({
      ...this.getState(),
      waiting: true,
    });

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

      if (json.error) {
        console.log("400");
        this.setState({
          ...this.getState(),
          error: `${json.error.data.issues[0].message ? json.error.data.issues[0].message : 'Некая ошибка от сервера'}`,
          waiting: false,
        });
        setTimeout(() => {
          this.setState({
            ...this.getState(),
            error: '',
          });
        }, 3000)
      } else {
        await localStorage.setItem('token', json?.result?.token);

        // Пользователь авторизован
        this.setState({
          user: {...this.getState().user, name: json?.result?.user?.profile?.name},
          error: '',
          isAuth: true,
          waiting: false,
        });
      }
      
    } catch (error){
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        error: `${error}`,
        waiting: false,
      });
    }
  }
  
    /**
   * Выход
   */
     async logout(){
      // Установка признака загрузки
      this.setState({
        ...this.getState(),
        waiting: true,
      });

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

        console.log("logout: ", response);

        if (response.status == 200) {
          await localStorage.removeItem('token');
    
          // Пользователь разлогинен
          this.setState({
            error: '',
            isAuth: false,
            user: {},
            waiting: false,
          });
        }
  

      } catch (e){
        this.setState({
          error: '',
          isAuth: false,
          user: {},
          waiting: false,
        });
      }
    }

    /**
   * Получить данные профиля
   */
  async me(){
     // Установка признака загрузки
     this.setState({
      ...this.getState(),
      waiting: true,
    });

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
        waiting: false,
    });
    } catch (e){
      // Ошибка при загрузке
      this.setState({
        ...this.getState(),
        isAuth: false,
        waiting: false,
      });
    }
  }

  resetState(){
    // Сброс стейта до initState 
    this.setState({
      user: {
        name: '',
        phone: '',
        email: '',
      },
      error: '',
      isAuth: false,
      waiting: false,
    });
 }

}

export default AuthState;
