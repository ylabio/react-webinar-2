import StateModule from "../module";

/**
 * Состояние товара
 */
class AutorizationState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      autorization: false,
      error: null
    };
  }

  async setLogin (login, password){
    try {
        const response = await fetch("/api/v1/users/sign", {
          method: "POST",
          body: JSON.stringify({
            login,
            password,
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
        const json = await response.json();
        
        if (json.error) {
            this.setState({
                waiting: false,
                autorization: false,
                error: json.error.data?.issues[0]?.message
            });
        } else {
            window.localStorage.setItem('token', json.result.token);
            await this.store.get('profile').getProfile(window.localStorage.getItem('token'));
            this.setState({
                waiting: false,
                autorization: true,
                error: null
              });
        }
    
    } catch (e){
        // Ошибка при загрузке
        this.setState({
          waiting: false,
          autorization: false,
          error: 'Ошибка сервера'
        });
      }
  }

  async logOut(token) {
    try {
        await fetch("/api/v1/users/sign", {
          method: "DELETE",
          headers: {
            "X-Token": token,
            "Content-type": "application/json",
          },
        });
       this.setState(this.initState());
       
       window.localStorage.removeItem('token')
        // удаляем данные из модуля состояний профиля
       this.store.get('profile').setState({
        data: {},
        waiting: false
       })
    } catch(e) {
        this.setState({
            ...this.getState(),
            error: 'Ошибка сервера'
        })
    }
  }

  async checkToken(token) {
    try {
        const response = await fetch("/api/v1/users/self", {
            method: 'GET',
            headers: {
                'X-Token': token,
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        if (json.error) {
            this.setState({
                waiting: false,
                error: json.error.data?.issues[0]?.message,
                autorization: false
            });
        } else {
            this.setState({
                waiting: false,
                error: null,
                autorization: true
              });
        }

    } catch (e) {
        this.setState({
            waiting: false,
            error: 'Ошибка сервера'
          });
    }
  }
}

export default AutorizationState;