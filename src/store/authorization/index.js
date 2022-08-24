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
      console.log('тест', json.result)
      localStorage.setItem('authToken', json.result.token)
      this.setState({
          ...this.getState(),
          error: '',
          token: json.result.token,
      }, 'Получение токена');
    }
  }

  /**
   * Очистка от ошибок
   */
  cleanError() {
    this.setState({
      ...this.getState(),
      error: '',
    }, 'Очистка от ошибок');
  }
}

export default AuthorizationState;