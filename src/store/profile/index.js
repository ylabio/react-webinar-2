import StateModule from "../module";

/**
 * Состояние товара
 */
class ProfileState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      userData: {},
    };
  }

  // загрузка данных пользователя в state
  async loadUser() {
    const token = localStorage.getItem('authToken');

    // Если токена нету, то не будет и лишнего запроса для проверки его работоспособности
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
        userData: {},
    }, 'Удаление токена');
  }
}

export default ProfileState;