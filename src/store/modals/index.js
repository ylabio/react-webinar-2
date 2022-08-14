import ModuleState from '../module';

/**
 * Управление модальными окнами
 */
class ModalsState extends ModuleState {

  initState() {
    return {
      name: null
    };
  }

  /**
   * Открытие модального окна по названию
   * @param name {String} Название модалки
   */
  open(name) {
    this.setState({
      name
    }, `Открытие модалки ${name}`);
  }

  /**
   * Закрытие модального окна
   */
  close() {
    this.setState({
      name: false
    }, `Закрытие модалки`);
  }
}

export default ModalsState;
