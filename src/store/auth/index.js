import StateModule from "../module";

/**
 * Состояние авторизации
 */
class AuthState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      userName: "",
      token: localStorage.getItem("token") || "",
      error: "",
      waiting: false,
      redirect: ""
    };
  }

  /**
   * Авторизация пользователя
   */
  async login(data) {
    this.setState({
      ...this.getState(),
      error: "",
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      // Проверяем ответ сервера
      await this.checkResponse(response);
      const json = await response.json();
      
      this.setState({
        ...this.getState(),
        userName: json.result.user.profile.name,
        token: json.result.token,
        error: "",
        waiting: false,
      });

      localStorage.setItem('token', json.result.token);
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
        waiting: false
      });
    }
  }

  /**
   * Загрузка данных для сессии при наличии токена
   */
  async loadUser(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        }
      });
      // Проверяем ответ сервера
      await this.checkResponse(response);
      const json = await response.json();

      this.setState({
        ...this.getState(),
        userName: json.result.profile.name,
        error: "",
        waiting: false
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
        token: "",        // Если восстановление сессии неудачно, сбрасываем токен в приложении
        waiting: false
      });
    }
  }

  /**
   * Выход пользователя
   */
  async deleteUser(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/sign`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token
        }
      });
      // Проверяем ответ сервера
      await this.checkResponse(response);

      this.setState({
        ...this.getState(),
        userName: "",
        token: "",
        error: "",
        waiting: false
      });

      localStorage.removeItem('token');
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
        waiting: false
      });
    }
  }

  /**
   * Проверка респонса
   */
  async checkResponse(response) {
    // Если запрос не успешен, пытаемся получить ответ сервера и записать ошибки,
      // иначе возвращаем код и статус
      if (!response.ok) {
        await response.json().then(
          (json) => {
            if (json.error) {
              let message = ""; 
              json.error.data.issues.forEach(issue => {
                message += issue.message + "\n";    
              });
              throw new Error(message);
            }
          },
          () => {
            throw new Error(response.status + ": " + response.statusText)
          }
        );
      }
  }

  /**
   * Сброс ошибки
   */
  clearError() {
    this.setState({
      ...this.getState(),
      error: "",
    });
  }

  /**
   * Сохранение ссылки для редиректа при авторизации
   */
  setRedirect(path) {
    this.setState({
      ...this.getState(),
      redirect: path,
    });
  }
}

export default AuthState;