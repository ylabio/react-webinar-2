import StateModule from "../module";

/**
 * Состояние каталога
 */
class CommonState extends StateModule {

  /**
  * Начальное состояние
  * @return {Object}
  */
  initState() {
    return {
      language: 'ru'
	};
  }

  setLanguage() {
    this.setState({
      language: this.getState().language === 'ru' ? 'en' : 'ru'
    });
  }
}

export default CommonState;
