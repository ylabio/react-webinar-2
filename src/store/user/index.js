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
        return true;
    } else {
        return false;
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
    return true;
  }
}

export default ModalsState;
