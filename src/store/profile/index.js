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
}

export default ProfileState;
