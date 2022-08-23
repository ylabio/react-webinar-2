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
      email: '',
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
      this.store.get('auth').setState({
        ...this.store.get('auth').getState(),
        isSigned: isSigned,
      });
      this.setState({
        name: profile.name,
        phone: profile.phone,
        email: result.email
      });


    } else {
      this.store.get('auth').setState({
        ...this.store.get('auth').getState(),
        isSigned: isSigned,
      });
    }
  }
}

export default ProfileState;