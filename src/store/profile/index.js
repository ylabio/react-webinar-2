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
      data: {
        _id: null,
        name: null,
        phone: null,
        email: null,
      },
      waiting: false,
      error: false,
    };
  }

  /**
   * Заполнение профиля пользователя
   * @param {object} newData данные пользователя
   * @param {string} newData.name имя пользователя
   * @param {string} newData.phone телефон пользователя
   * @param {string} newData.email email пользователя
   */
  setAuthProfile(newData) {
    this.setState({
      ...this.getState(),
      data: {
        ...this.getState().data,
        _id: newData._id,
        name: newData.name,
        phone: newData.phone,
        email: newData.email,
      },
    });
  }

  async getProfile() {
    this.setState({
      ...this.getState(),
      waiting: true,
      error: false,
    });

    try {
      const json = await this.store.get('auth').isAuth();
      const userData = {
        _id: json.result._id,
        name: json.result.profile.name,
        phone: json.result.profile.phone,
        email: json.result.email,
      };

      this.setAuthProfile(userData);
    } catch (error) {
      this.setState({
        ...this.getState(),
        error: true,
      });
    } finally {
      this.setState({
        ...this.getState(),
        waiting: false,
      });
    }
  }
}

export default ProfileState;
