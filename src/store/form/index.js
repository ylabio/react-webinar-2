import StateModule from "../module";

/**
 * Состояние товара
 */
class FormState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      login: '',
      password: '',
      result: {}
    };
  }

  inputLogin(login) {
    this.setState({
      ...this.getState(),
      login,
    });

   
  }

  inputPassword(password) {
    this.setState({
      ...this.getState(),
      password,
    });
    
  }

  resetForm() {
    this.setState({
      ...this.getState(),
      result: {},
    });
  }

  async login() {
    try {
      await fetch('/api/v1/users/sign', {
        method: 'POST',
      
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({login: this.getState().login, password: this.getState().password})
      })
      .then((response) => {
        if(response.ok) {
          return  response.json()
        } else {
          return  response.json()
        }
      })
      .then(res => {
        this.setState({
          ...this.getState(),
          result: res
        })
        localStorage.setItem('token', this.getState().result.result.token)
      })
    
    } catch(e) {
      console.log(e)
    }
  }


  async logout(token) {
    try {
      await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token':  token,
          'Content-Type': 'application/json;charset=utf-8'
        },
      })
      .then((response) => response.json())
      .catch((e) => console.log(e))
      .then(res => {
        this.setState({
          ...this.getState(),
          result: {}
        })
        localStorage.clear()
      })
    } catch(e) {
      console.log(e)
    }
  }

  async loadProfile(token) {
    try {
      await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json;charset=utf-8'
        },
      })
      .then((response) => response.json())
      .catch((e) => console.log(e))
      .then(res => {
        this.setState({
          ...this.getState(),
          result: res
        })
      })
    } catch(e) {
      console.log(e)
    }
  }
  

}

export default FormState;
