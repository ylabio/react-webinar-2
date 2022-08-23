import StateModule from '../module';

class UserState extends StateModule {
  BASE_URL = '/api/v1/';
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      token: '',
      isLogged: false,
      waiting: true,
    };
  }

  authorize = async (login, password) => {
    return await fetch(`${this.BASE_URL}/users/sign`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          this.setState({
            user: data.result.user,
            token: data.result.token,
            isLogged: true,
            waiting: false,
          });
        }
        return data;
      });
  };

  cancelAuthorize = async (token) => {
    return await fetch(`${this.BASE_URL}/users/sign`, {
      method: 'DELETE',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          this.setState({
            user: '',
            token: '',
            isLogged: false,
          });
        }
        return data;
      });
  };

  checkToken = async (token) => {
    return await fetch(`${this.BASE_URL}/users/self`, {
      method: 'GET',
      headers: {
        'X-Token': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          this.setState({
            user: data.result,
            token: token,
            isLogged: true,
            waiting: false,
          });
        }
        return data;
      });
  };
}

export default UserState;
