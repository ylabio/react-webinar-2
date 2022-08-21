import StateModule from '../module';

class UserState extends StateModule {
  initState() {
    return {
      profile: { name: this.getNameFromLC() },
      status: null,
      errors: null,
      waiting: false,
    };
  }

  async onSignIn(data, cb) {
    try {
      this.setWaiting(true);

      const options = {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
      };

      const response = await fetch('/api/v1/users/sign', options);
      const json = await response.json();
      if (json.error) throw json.error;
      const profile = { ...json.result.user.profile, email: json.result.user.email };
      this.setNameToLC(profile.name);
      this.mergeState({ profile, status: json.result.user.status, waiting: false });
      if (cb) cb();
    } catch (err) {
      this.removeNameFromLC();
      this.mergeState({ errors: err?.data?.issues, waiting: false });
    }
  }

  async onLogout(token) {
    try {
      this.setWaiting(true);

      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'X-Token': token,
        },
      };

      const response = await fetch('/api/v1/users/sign', options);
      await response.json();
      this.removeNameFromLC();
      document.cookie = 'token=';
      this.setState({ ...this.initState(), waiting: false });
    } catch (err) {
      this.mergeState({ errors: err, waiting: false });
    }
  }

  async initUserAuth(token) {
    if (token) {
      try {
        this.setWaiting(true);
        const options = {
          method: 'GET',
          headers: {
            'X-Token': token,
          },
        };
        const response = await fetch('/api/v1/users/self', options);
        const json = await response.json();

        const profile = { ...json.result.profile, email: json.result.email };
        this.setNameToLC(profile.name);
        this.mergeState({ profile, status: json.result.status, waiting: false });
      } catch (err) {
        this.removeNameFromLC();
        this.mergeState({ errors: err, profile: {}, waiting: false });
      }
    } else {
      this.removeNameFromLC();
      this.mergeState({ profile: {} });
    }
  }

  mergeState(obj) {
    this.setState({ ...this.getState(), ...obj });
  }

  setWaiting(bool) {
    const res = { waiting: bool };
    if (bool) res.errors = null;
    this.mergeState(res);
  }

  getNameFromLC() {
    return localStorage.getItem('name');
  }

  removeNameFromLC() {
    localStorage.removeItem('name');
  }

  setNameToLC(name) {
    return localStorage.setItem('name', name);
  }
}

export default UserState;
