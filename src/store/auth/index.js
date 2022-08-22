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
      user: null,
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
      const json = await response.json();

      if (json.error) { 
        let message = "";
        json.error.data.issues.forEach(issue => {
          message += issue.message + "\n";    
        });
        throw new Error(message);
      }
      
      this.setState({
        ...this.getState(),
        user: json.result.user,
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
   * Загрузка профиля при наличии токена
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
      const json = await response.json();

      if (json.error) { 
        let message = "";
        json.error.data.issues.forEach(issue => {
          message += issue.message + "\n";    
        });
        throw new Error(message);
      }

      this.setState({
        ...this.getState(),
        user: json.result,
        error: "",
        waiting: false
      });
    } catch (e) {
      this.setState({
        ...this.getState(),
        error: e.message,
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
      const json = await response.json();

      if (json.error) { 
        let message = "";
        json.error.data.issues.forEach(issue => {
          message += issue.message + "\n";    
        });
        throw new Error(message);
      }

      this.setState({
        ...this.getState(),
        user: null,
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