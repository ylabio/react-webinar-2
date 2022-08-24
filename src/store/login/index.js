import StateModule from "../module";

/**
 * Состояние страницы логина
 */
class LoginState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      login: '',
      password: '',
      error: null,
      waiting: false
    };
  }

  setLogin(login) {
    this.setState({
      ...this.getState(),
      login
    }, 'Login: ' + login);
  }

  setPassword(password) {
    this.setState({
      ...this.getState(),
      password
    }, 'Password: ' + password);
  }

  async login() {
    this.setState({
      ...this.getState(),
      error: null,
      waiting: true
    }, 'Loginning...');

    const st = this.getState();
    const json = await (
      await fetch('/api/v1/users/sign', {
        method: 'POST',
        body: JSON.stringify({ login: st.login, password: st.password }),
        headers: { 'Content-Type': 'application/json' }
      })
    ).json();

    if (json.error) {
      let error = '';
      const issues = json.error.data?.issues;
      if (issues && issues.length) {
        issues.forEach(issue => {
          error += issue.message + '\n';
        });
      } else
        error = json.error.code + ': ' + json.error.message;

      this.setState({
        ...this.getState(),
        error,
        waiting: false
      }, 'Error code ' + json.error.code);
      return;
    }

    this.store.get('user').setData(json.result.fields, json.result.token);

    this.setState({
      ...this.getState(),
      waiting: false
    }, 'Login successful!');
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null
    }, 'Reset login error');
  }
}

export default LoginState;