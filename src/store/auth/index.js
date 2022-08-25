import StateModule from "../module";

/**
 * Состояние 
 */
class AuthState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: null,
      token: null,
      err: null,
      waiting: false
    };
  }

  getInitAuth() {
    this.setState({
      ...this.getState(),
      waiting: true
    });
    const { user, token } = this.getState();
    let initState = {};
    (!user && localStorage.user === undefined) ? initState.user = null : initState.user = JSON.parse(localStorage.user);
    (!token && localStorage.token === undefined) ? initState.token = null : initState.token = JSON.parse(localStorage.token);

    this.setState({
      ...this.getState(),
      user: initState.user,
      token: initState.token,
      waiting: false
    });
  }

  async logIn(password, login) {

    this.setState({
      ...this.getState(),
      waiting: true
    });

    const query = '/api/v1/users/sign';
    const body = JSON.stringify({
        login: login,
        password: password,
        remeber: true
    });
    const res = await fetch(query, {
        method: 'POST',
        body,
        headers: {'Content-Type': 'application/json'}
    });
    if (res.ok) {
        const { result } = await res.json()
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', JSON.stringify(result.token));

        this.setState({
            ...this.getState(),
            user: result.user,
            token: result.token,
            err: null,
            waiting: false
          });
        } else {
          const { error : { data } } = await res.json()

          this.setState({
              ...this.getState(),
              user: null,
              token: null,
              err: data.issues[0].message,
              waiting: false
          });
      }
  }

  async logOut() {
    this.setState({
      ...this.getState(),
      waiting: true
    });

    const query = '/api/v1/users/sign';
    const res = await fetch(query, {
        method: "DELETE",
        headers: {
          "X-Token": this.getState().token,
          "Content-Type": "application/json",
        },
      });
      const { result } = await res.json()
      if (result) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        this.setState({
            ...this.getState(),
            user: null,
            token: null,
            err: null,
            waiting: false
          });
        } else {


        this.setState({
            ...this.getState(),
            err: res,
            waiting: false
      });
    }
  };
}

export default AuthState;
