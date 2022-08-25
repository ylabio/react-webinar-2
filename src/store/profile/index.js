import StateModule from "../module";

/**
 * Состояние профиля
 */
class ProfileState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: {},
      waiting: true
    };
  }

  /**
   * Загрузка данных профиля
   */
  async load() {
    // Сброс текущего состояния профиля и установка признака ожидания загрузки
    this.setState({
      user: {},
      waiting: true
    });

    const token = localStorage.getItem('auth-token');
    if (!token) return

    try {
      const res = await fetch('/api/v1/users/self', {
        method: 'GET',
        headers: {
          'X-Token': token,
        },
      });

      const json = await res.json();
      // Профиль загружен успешно
      this.setState({
        user: json.result,
        waiting: false
      });
    } catch (e) {
      // Ошибка при загрузке
      this.setState({
        user: {},
        waiting: false
      });
    }
  }
}

export default ProfileState;
