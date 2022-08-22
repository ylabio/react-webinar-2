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
      user: {},
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
                user: {},
                waiting: false,
                autorization: false,
                error: json.error.data?.issues[0]?.message
            });
        } else {
            window.localStorage.setItem('token', json.result.token)
            this.setState({
                user: {...json.result.user},
                waiting: false,
                autorization: true,
                error: null
              });
        }
        
    } catch (e){
        // Ошибка при загрузке
        this.setState({
          user: {},
          waiting: false,
          autorization: false,
          error: 'Ошибка сервера'
        });
      }
  }

  async logOut() {
    try {
        await fetch("/api/v1/users/sign", {
          method: "DELETE",
          headers: {
            "X-Token": `${this.getState().token}`,
            "Content-type": "application/json",
          },
        });
       this.setState(this.initState());
       window.localStorage.removeItem('token')
    } catch(e) {
        this.setState({
            ...this.getState(),
            error: 'Ошибка сервера'
        })
    }
  }

  async getProfile() {
    try {
        const response = await fetch("/api/v1/users/self", {
            method: 'GET',
            headers: {
                'X-Token': `${window.localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        });
        const json = await response.json();
        if (json.error) {
            this.setState({
                user: {},
                waiting: false,
                error: json.error.data?.issues[0]?.message,
                autorization: false
            });
        } else {
            this.setState({
                user: {...json.result},
                waiting: false,
                error: null,
                autorization: true
              });
        }

    } catch (e) {
        this.setState({
            user: {},
            waiting: false,
            error: 'Ошибка сервера'
          });
    }
  }
}

export default AutorizationState;