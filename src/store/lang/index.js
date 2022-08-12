import StateModule from "../module";

/**
 * Управление модальными окнами
 */
class LanguageState extends StateModule{

  initState() {
    return {
      name: 'ru'
    };
  }

  /**
   * Открытие модального окна по названию
   * @param name {String} Название модалки
   */
  setLanguage(name){
    this.setState({
      name: name
    }, `Смена языка приложения ${name}`);
  }
}

export default LanguageState;
