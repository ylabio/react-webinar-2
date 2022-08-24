import StateModule from '../module';

/**
 * Состояние товара
 */
class AppState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      initialized: false,
      waiting: false,
    };
  }

  /**
   * Инициализация приложения
   */
  async init() {
    this.setState({
      ...this.getState(),
      waiting: true,
    });

    await this.store.get('auth').isAuth();

    this.setState({
      ...this.getState(),
      waiting: false,
      initialized: true,
    });
  }
}

export default AppState;
