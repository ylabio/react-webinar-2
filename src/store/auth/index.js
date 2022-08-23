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
      isAuth: false,
    };
  }

  setUserData(data) {
    this.setState({
      ...this.getState(),
      user: data.user,
      token: data.token,
      isFetching: false,
      isAuth: data.isAuth,
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
      const token = json.result.token; 
      localStorage.setItem('ylab', JSON.stringify({token}));
      this.setUserData({
        ...json.result,
        isAuth: true,
      });       
    }  
    
  }
  
  async signOut(token) {
    this.setIsFetching(true);

    const response = await fetch('api/v1/users/sign', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-TOKEN': token
      }
    });
    const json = await response.json();

    if (json.result) {
      localStorage.removeItem('ylab');
      this.setUserData({
        user: null,
        token: null,
        isAuth: false,
      });  
    } else {
      this.setIsFetching(false);
    } 
  }

  async getProfile(token) {
    this.setIsFetching(true);

    const response = await fetch('api/v1/users/self', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-TOKEN': token
      }
    });
    const json = await response.json(); 
    
    if (json.result) {
      this.setUserData({
        user: json.result,
        token: token,
        isAuth: true,
      });
    } else {
      localStorage.removeItem('ylab');
      this.setState({
        ...this.getState(),
        setIsAuth: false,
        setIsFetching: false,
      });
    }

  }
}

export default AuthState;
