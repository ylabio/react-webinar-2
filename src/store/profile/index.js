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
      user: { name: '', email: '', phone: '' },
      waiting: false,
    };
  }

  // проверка на авторизацию пользователя
  async loadUserData(token) {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    try {
      const response = await fetch(`/api/v1/users/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      if (response.status === 403) {
        throw new Error('Что-то не так с загрузкой данных!');
      }

      const json = await response.json();
      const result = json.result;

      this.setState({
        user: {
          email: result.email,
          phone: result.profile.phone,
          name: result.profile.name,
        },
        waiting: false,
      });
    } catch (error) {
      console.log(error.message);
      localStorage.removeItem('token');
      this.setState({
        ...this.initState(),
      });
      this.store.get('session').setState({
        ...this.store.get('session').getState(),
        isLogged: false,
      });
    }
  }
}

export default ProfileState;
