import StateModule from "../module";

/**
 * Управление авторизацией
 */
class ModalsState extends StateModule{

  initState() {
    return {
      name: null
    };
  }

  async auth(login, password){
    const response = await fetch(`/api/v1/users/sign`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {
                login: login, 
                password: password,
                remember: true
            })
    });
    const json = await response.json();
    const result = json.result;

    if (result) {
        this.setState({
            ...this.getState(),
            token: result.token,
            user: result.user,
        })
        window.localStorage.setItem("login", login);
        window.localStorage.setItem("password", password);
        return {result: true};
    } else {
        console.log(json.error);
        return {error: json.error};
    }
  }

  async logout(token){
    await fetch(`/api/v1/users/sign/`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'X-Token': token
      }
    });
    this.setState({
      ...this.getState(),
      token: null,
      user: null,
  })
    window.localStorage.removeItem("login");
    window.localStorage.removeItem("password");
    return true;
  }
}

export default ModalsState;
