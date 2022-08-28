import StateModule from "../module";

/**
 * Состояние
 */
class User extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      auth:{
        'login': '',
        'password': ''
      },
      data:{},
      waiting: true,
      logined: false
    };
  }

  /**
   * Загрузка информации пользователя
   */
  async signIn(props){
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/users/sign`,{
        method:'Post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({...props})
      });
      const json = await response.json();
      if(json.result) {
        // Авторизация успешна
        this.setState({
          data: json.result.user,
          waiting: false,
          logined: true
        });
        localStorage.setItem('token',json.result.token)
      }
      else if(json.error){
        this.setState({
          error:json.error,
          waiting: false
        });
      }
    } catch (e){
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        data: {},
        waiting: false
      });
    }
  }
  async loadProfile(props){
    this.setState({
      ...this.getState(),
      waiting: true,
    });
    try {
      const response = await fetch(`/api/v1/users/self`,{
        method:'get',
        headers:{'X-Token': props},
      });
      const json = await response.json();
      if(json.result)
        {this.setState({
          data:json.result,
          waiting: false,
          logined: true
        });
        } 
      else if(json.error){
        this.setState({
          error:json.error,
          waiting: false
        });
      }
    } catch (e){
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        data: {},
        waiting: false
      });
    }
  }
  
  async signOut(){
    // Выход
    this.setState({
      auth:{
        'login': '',
        'password': ''
      },
      data:{},
      waiting: true
    });
    try {
      await fetch(`/api/v1/users/sign`,{
        method:'delete',
      });
      localStorage.removeItem('token')
        this.setState({
          data: {},
          waiting: false
        });
    } catch (e){
      // Ошибка при загрузке
      // @todo В стейт можно положть информауию об ошибке
      this.setState({
        data: {},
        waiting: false
      });
    }
  }
  resetError(){
    this.setState({
      ...this.getState(),
      error:{}
    });
  }
}

export default User;
