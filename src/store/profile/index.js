import StateModule from '../module';

class ProfileState extends StateModule {

  /**
   * Начальное состояние
   * @returns -
   */
  initState() {
    return {
      name: '',
      phone: '',
      email: '',
    }
  }

  /**
   * Получение данных профиля
   * @param {*} token 
   */
  async getProfile(token) {
    console.log('getProfile');
    const response = await fetch('/api/v1/users/self', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'X-Token': token,
      },
    });
    const json = await response.json();
    if (response.status >=200 && response.status < 300) {     
      const {result} = json;
      this.setState({
        name: result.profile.name,
        phone: result.profile.phone,
        email: result.email,
      })
    } else { 
        this.setState({
          name: '',
          phone: '',
          email: '',
        })
    }   
  }
}

export default ProfileState;
