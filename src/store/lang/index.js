import StateModule from "../module";

/**
 * Состояние каталога
 */
class CatalogState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      lang: "ru",
    };
  }

  changeLang(code) {
    console.log(code);
    this.setState({
      ...this.state,
      lang: code,
    });
  }
}

export default CatalogState;
