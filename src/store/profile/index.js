import StateModule from '../module';

/**
 * Состояние товара
 */
class ProfileState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      name: '',
      phone: '',
      email: ''
    };
  }

  async fetchProfile(token) {
    let isSigned = false;

    const response = await fetch('api/v1/users/self', {
      headers: {
        'Content-Type': 'application/json',
        'X-Token': `${token}`
      }
    });

    if (response.ok) {
      isSigned = true;
      const json = await response.json();
      const result = json.result;
      const profile = result.profile;

      this.setState({
        name: profile.name,
        phone: profile.phone,
        email: result.email
      });
    }

    this.store.get('session').setState({
      ...this.store.get('session').getState(),
      isSigned
    });
  }
}

export default ProfileState;
