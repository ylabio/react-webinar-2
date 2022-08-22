import StateModule from "../module";

/**
 * Параметры юзера
 */
class UserState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      inputs: { login: '', password: '' },
      fields: null, // полей может быть много
      token: localStorage.getItem('token'),
      error: '',
      waiting: false
    };
  }

  setLogin(login) {
    this.setState({
      ...this.getState(),
      inputs: {
        ...this.getState().inputs,
        login
      },
      error: null
    }, 'Login: ' + login);
  }

  setPassword(password) {
    this.setState({
      ...this.getState(),
      inputs: {
        ...this.getState().inputs,
        password
      },
      error: null
    }, 'Password: ' + password);
  }

  async login() {
    this.setState({
      ...this.getState(),
      error: null,
      waiting: true
    }, 'Loginning...');

    const inputs = this.getState().inputs;
    const result = await (
      await fetch('/api/v1/users/sign', {
        method: 'POST',
        body: JSON.stringify({ login: inputs.login, password: inputs.password }),
        headers: { 'Content-Type': 'application/json' }
      })
    ).json();

    if (result.error) {
      //console.error(result.error);
      let error = '';
      const issues = result.error.data?.issues;
      if (issues && issues.length) {
        issues.forEach(issue => {
          error += issue.message + '\n';
        });
      } else
        error = result.error.code + ': ' + result.error.message;

      this.setState({
        ...this.getState(),
        error,
        waiting: false
      }, 'Error code ' + result.error.code);
      return;
    }

    localStorage.setItem('token', result.result.token);

    this.setState({
      ...this.getState(),
      fields: result.result.fields,
      token: result.result.token, // пока не используется
      waiting: false
    }, 'Login successful!');
  }

  async logout() {
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: { "X-Token": localStorage.getItem('token') }
    });

    localStorage.removeItem('token');

    this.setState({
      ...this.getState(),
      fields: null,
      token: null
    }, 'Logout done!');
  }

  async loadProfile() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Loading profile...');

    const result = await (
      await fetch('/api/v1/users/self', {
        headers: { "X-Token": localStorage.getItem('token') }
      })
    ).json();

    if (result.error) {
      this.setState({
        ...this.getState(),
        error: result.error,
        waiting: false
      }, 'Cant load profile');
      return;
    }

    this.setState({
      ...this.getState(),
      waiting: false,
      fields: result.result
    }, 'Profile has been loaded');
  }
}

export default UserState;