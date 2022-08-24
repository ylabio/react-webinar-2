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
      authName: '',
      waiting: false,
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
          authName: json.result.user.profile.name
      }, 'Получение токена');
    }
  }

  // Проверка работоспособности токена
  async checkToken() {

    const token = localStorage.getItem('authToken');

    // если токен не найден, то останавливаем чтобы не делать лишнего запроса
    if (!token) return

    this.setState({
      ...this.getState(),
      waiting: true
    });

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
      authName: json.result.profile.name,
      error: '',
      token,
      waiting: false
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
    
    localStorage.removeItem('authToken');

    this.setState({
        ...this.getState(),
        authName: '',
        error: '',
        token: '',
    }, 'Удаление токена');
  }

  // очистка от ошибки
  cleanError() {
    this.setState({
      ...this.getState(),
      error: '',
    }, 'Очистка от ошибок');
  }
}

export default AuthorizationState;