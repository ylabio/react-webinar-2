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
      fields: null, // полей может быть много
      token: localStorage.getItem('token'),
      error: null,
      waiting: false
    };
  }

  setData(fields, token) {
    localStorage.setItem('token', token);
    this.setState({
      ...this.getState(),
      fields,
      token
    }, 'User data updated!');
  }

  async logout() {
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: { "X-Token": localStorage.getItem('token') }
    });

    localStorage.removeItem('token');

    this.store.get('profile').setUserData(null);

    this.setState({
      ...this.getState(),
      fields: null,
      token: null
    }, 'Logout done!');
  }

  async loadUserData() {
    this.setState({
      ...this.getState(),
      waiting: true
    }, 'Loading user data...');

    const json = await (
      await fetch('/api/v1/users/self', {
        headers: { "X-Token": localStorage.getItem('token') }
      })
    ).json();

    if (json.error) {
      this.setState({
        ...this.getState(),
        error: json.error,
        waiting: false
      }, 'Cant load user data');
      return;
    }

    this.setState({
      ...this.getState(),
      waiting: false,
      fields: json.result
    }, 'User data has been loaded');

    this.store.get('profile').setUserData(json.result);
  }

  resetError() {
    this.setState({
      ...this.getState(),
      error: null
    }, 'Reset user loading error');
  }
}

export default UserState;