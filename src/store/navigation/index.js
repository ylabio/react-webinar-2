import StateModule from "../module";

/**
 * Состояние каталога
 */
class NavigationState extends StateModule{

  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      menuItems: [
        {
          link: '/',
          title: 'Главная'
        }
      ]
    };
  }
}

export default NavigationState;