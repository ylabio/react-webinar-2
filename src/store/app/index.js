import StateModule from "../module";

/**
 * Управление языком интерфейса
 */
class AppState extends StateModule{

  initState() {
    return {
      locale: 'ru',
    };
  }

  /**
   * Смена языка интерфейса
   * @param locale {String} идентификатор языка интерфейса
   */
  changeLocale(locale){
    // console.log("locale at store: ", locale);
    localStorage.setItem('locale', locale)
    this.setState({
      locale
    }, `Смена языка на ${locale}`);
  }

    /**
   * Инициализировать языка интерфейса
   * @param locale {String} идентификатор языка интерфейса
   */
     initLocale(){
      const locale = localStorage.getItem('locale')
      console.log("locale at localStorage: ", locale);
      this.setState({
        locale: locale ? locale : 'ru'
      }, `инициализация языка из localStorage ${locale}`);
    }

}

export default AppState;
