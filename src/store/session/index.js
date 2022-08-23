import StateModule from "../module";

/**
 * Состояние сессии
 */
class SessionState extends StateModule {

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      user: null,
      isLoading: true,
      loadingError: false
    };
  }

  /**
   * Получение пользователя по токену
   */
  async getProfile() {
    const token = localStorage.getItem('TOKEN');

    this.changeLoading(true);

    const response = await fetch('/api/v1/users/self', {
      headers: {"X-Token": token}
    })
    const data = await response.json();

    if (data.error) {
      this.setLoadingError(true);
      this.changeLoading(false);

      return
    }

    this.setState({
      ...this.getState(),
      isLoading: false,
      user: data.result
    }, 'Пользователь получен по токену');

    this.changeLoading(false);
  }

  /**
   * Запись в стейт данных о пользователе при авторизации
   * @param user {Object}
   */
  setUser(user) {
    this.setState({
      ...this.getState(),
      user
    }, 'Пользователь авторизован и данные о нем записаны в стейт');
  }

  /**
   * Деавторизация пользователя
   */
  async logout() {
    const token = localStorage.getItem('TOKEN');
    await fetch('/api/v1/users/sign', {
      method: 'DELETE',
      headers: {"X-Token": token}
    });

    localStorage.removeItem('TOKEN');

    this.setState({
      ...this.getState(),
      user: null
    }, 'Пользователь деавторизован и данные о нем удалены из стейта');
  }

  /**
   * Изменение в стейте состояния ошибки
   * @param bool {boolean}
   */
  setLoadingError(bool) {
    this.setState({
      ...this.getState(),
      loadingError: bool
    }, bool ? 'Запись в стейт ошибки при загрузке' : 'Удаление из стейта ошибки при загрузке')
  }

  /**
   * Изменение в стейте состояния загрузки
   * @param bool {boolean}
   */
  changeLoading(bool) {
    this.setState({
      ...this.getState(),
      isLoading: bool
    }, bool ? 'Начало загрузки' : 'Конец загрузки')
  }
}

export default SessionState;
