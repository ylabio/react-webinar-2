import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class LoadingScreen extends StateModule{

  initState() {
    return {
      status: false
    };
  }

  /**
   * Открытие модального окна по названию
   * @param name {String} Название модалки
   */
  open(){
    this.setState({
      status: true
    }, `Открытие экрана загрузки`);
  }

  /**
   * Закрытие модального окна
   */
  close(){
    this.setState({
      stats: false
    }, `Закрытие экрана загрузки`);
  }
}

export default LoadingScreen;