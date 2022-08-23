import StateModule from "../module";

/**
 * Состояние товара
 */
class AuthorizationState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      error: '',
      token: '',
      userData: {},
    };
  }

  /**
   * Получение токена
   */
  async loginRequest(data){



    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...data, remember: true})
    };

    const response = await fetch('/api/v1/users/sign', requestOptions);
    const json = await response.json();

    if (!json.result) {
      this.setState({
      ...this.getState(),
      error: json.error.data?.issues[0]?.message,
      })
    } else {
      localStorage.setItem('authToken', json.result.token)
      this.setState({
          ...this.getState(),
          error: '',
          token: json.result.token,
          userData: json.result.user
      }, 'Получение токена');
    }
  }

  // загрузка данных пользователя в state
  async loadUser() {
    const token = localStorage.getItem('authToken');

    if (!token) return

    const requestOptions = {
      method: 'GET',
      headers: {
        'X-Token': token,
      },
    }

    const res = await fetch('/api/v1/users/self', requestOptions);
    const json = await res.json();

    this.setState({
      ...this.getState(),
      userData: json.result,
      error: '',
      token,
    }, 'Загрузка данных пользователя');
  }
  
  // Выход из личного кабинета пользователя (сброс параметров и удаление токена 
  async logout() {
    const token = this.getState().token;

    const requestOptions = {
      method: 'DELETE',
      headers: {
        'X-Token': token,
      }
    }

    const response = await fetch('/api/v1/users/sign', requestOptions);
    const json = await response.json();
    
    localStorage.removeItem('authToken');

    this.setState({
        ...this.getState(),
        error: '',
        token: '',
        userData: {},
    }, 'Удаление токена');
  }

  // очистка от ошибок
  async cleanError() {
    this.setState({
      ...this.getState(),
      error: '',
    }, 'Очистка от ошибок');
  }
}

export default AuthorizationState;