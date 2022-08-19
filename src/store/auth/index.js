import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class AuthState extends StateModule{

  initState() {
    return {
      user: null,
      token: null,
      isFetching: false,
      errorMsg: '',  
    };
  }

  setUserData(data) {
    this.setState({
      user: data.user,
      token: data.token,
      isFetching: false,
    });
  }

  setIsFetching(flag) {
    this.setState({
      ...this.getState(),
      isFetching: flag,
    }); 
  }

  setErrorMsg(errorMsg) {
    this.setState({
      ...this.getState(),
      errorMsg,
      isFetching: false,
    }); 
  }

  async login(data) {

    this.setIsFetching(true);

    const response = await fetch('api/v1/users/sign', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        login: data.username,
        password: data.password,
      })
    });
    const json = await response.json();

    if (json.error) {
      this.setErrorMsg(json.error.message);
    } else {
      this.setUserData(json.result);
    }  
    
  } 
}

export default AuthState;
